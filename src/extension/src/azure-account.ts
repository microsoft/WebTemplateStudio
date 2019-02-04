/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const CacheDriver = require('adal-node/lib/cache-driver');
const createLogContext = require('adal-node/lib/log').createLogContext;

import { MemoryCache, AuthenticationContext, Logging, UserCodeInfo } from 'adal-node';
import { DeviceTokenCredentials, AzureEnvironment } from 'ms-rest-azure';
import { SubscriptionClient, SubscriptionModels } from 'azure-arm-resource';
import * as nls from 'vscode-nls';
import * as keytarType from 'keytar';
import * as dns from 'dns';

import { window, commands, EventEmitter, MessageItem, ExtensionContext, workspace, ConfigurationTarget, WorkspaceConfiguration, env, OutputChannel, QuickPickItem, CancellationTokenSource, Uri } from 'vscode';
import { AzureAccount, AzureSession, AzureLoginStatus, AzureResourceFilter, AzureSubscription } from './azure-account.api';
import * as codeFlowLogin from './codeFlowLogin';
import TelemetryReporter from 'vscode-extension-telemetry';
import { promisify } from 'util';
import { TokenResponse } from 'adal-node';

const localize = nls.loadMessageBundle();

const keytar = getNodeModule<typeof keytarType>('keytar');

declare const __webpack_require__: typeof require;
declare const __non_webpack_require__: typeof require;
function getNodeModule<T>(moduleName: string): T | undefined {
	const r = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;
	try {
		return r(`${env.appRoot}/node_modules.asar/${moduleName}`);
	} catch (err) {
		// Not in ASAR.
	}
	try {
		return r(`${env.appRoot}/node_modules/${moduleName}`);
	} catch (err) {
		// Not available.
	}
	return undefined;
}

const credentialsSection = 'VS Code Azure';

async function getRefreshToken(environment: AzureEnvironment, migrateToken?: boolean) {
	if (!keytar) {
		return;
	}
	if (migrateToken) {
		const token = await keytar.getPassword('VSCode Public Azure', 'Refresh Token');
		if (token) {
			if (!await keytar.getPassword(credentialsSection, 'Azure')) {
				await keytar.setPassword(credentialsSection, 'Azure', token);
			}
			await keytar.deletePassword('VSCode Public Azure', 'Refresh Token');
		}
	}
	return keytar.getPassword(credentialsSection, environment.name);
}

async function storeRefreshToken(environment: AzureEnvironment, token: string) {
	if (keytar) {
		await keytar.setPassword(credentialsSection, environment.name, token);
	}
}

async function deleteRefreshToken(environmentName: string) {
	if (keytar) {
		await keytar.deletePassword(credentialsSection, environmentName);
	}
}

const staticEnvironments: AzureEnvironment[] = [
	AzureEnvironment.Azure,
	AzureEnvironment.AzureChina,
	AzureEnvironment.AzureGermanCloud,
	AzureEnvironment.AzureUSGovernment
];

const azurePPE = 'AzurePPE';

const staticEnvironmentNames = [
	...staticEnvironments.map(environment => environment.name),
	azurePPE
];

const environmentLabels: Record<string, string> = {
	Azure: localize('azure-account.azureCloud', 'Azure'),
	AzureChina: localize('azure-account.azureChinaCloud', 'Azure China'),
	AzureGermanCloud: localize('azure-account.azureGermanyCloud', 'Azure Germany'),
	AzureUSGovernment: localize('azure-account.azureUSCloud', 'Azure US Government'),
	[azurePPE]: localize('azure-account.azurePPE', 'Azure PPE'),
};

const logVerbose = false;
const commonTenantId = 'common';
const clientId = 'aebc6443-996d-45c2-90f0-388ff96faa56'; // VSC: 'aebc6443-996d-45c2-90f0-388ff96faa56'
const validateAuthority = true;

interface AzureAccountWriteable extends AzureAccount {
	status: AzureLoginStatus;
}

class AzureLoginError extends Error {
	constructor(message: string, public reason?: any) {
		super(message);
	}
}

interface SubscriptionItem extends QuickPickItem {
	type: 'item';
	subscription: AzureSubscription;
	picked: boolean;
}

interface Cache {
	subscriptions: {
		session: {
			environment: string;
			userId: string;
			tenantId: string;
		};
		subscription: SubscriptionModels.Subscription;
	}[];
}

class ProxyTokenCache {

	public initEnd?: () => void;
	private init = new Promise(resolve => {
		this.initEnd = resolve;
	});

	constructor(private target: any) {
	}

	remove(entries: any, callback: any) {
		this.target.remove(entries, callback)
	}

	add(entries: any, callback: any) {
		this.target.add(entries, callback)
	}

	find(query: any, callback: any) {
		this.init.then(() => {
			this.target.find(query, callback);
		});
	}
}

type LoginTrigger = 'activation' | 'login' | 'loginWithDeviceCode' | 'loginToCloud' | 'cloudChange' | 'tenantChange';
type CodePath = 'tryExisting' | 'newLogin' | 'newLoginCodeFlow' | 'newLoginDeviceCode';

export class AzureLoginHelper {

	private onStatusChanged = new EventEmitter<AzureLoginStatus>();
	private onSessionsChanged = new EventEmitter<void>();

	private subscriptions = Promise.resolve(<AzureSubscription[]>[]);
	private onSubscriptionsChanged = new EventEmitter<void>();

	private filters = Promise.resolve(<AzureResourceFilter[]>[]);

	private onFiltersChanged = new EventEmitter<void>();

	private tokenCache = new MemoryCache();
	private delayedCache = new ProxyTokenCache(this.tokenCache);
	private oldResourceFilter = '';
	private doLogin = false;

	constructor(private context: ExtensionContext, private reporter: TelemetryReporter) {
		const subscriptions = context.subscriptions;
		subscriptions.push(commands.registerCommand('webTemplateStudio.login', () => this.login('login').catch(console.error)));
		subscriptions.push(commands.registerCommand('webTemplateStudio.loginWithDeviceCode', () => this.login('loginWithDeviceCode').catch(console.error)));
		subscriptions.push(commands.registerCommand('webTemplateStudio.logout', () => this.logout().catch(console.error)));
		subscriptions.push(commands.registerCommand('webTemplateStudio.loginToCloud', () => this.loginToCloud().catch(console.error)));
		subscriptions.push(commands.registerCommand('webTemplateStudio.askForLogin', () => this.askForLogin().catch(console.error)));
		subscriptions.push(commands.registerCommand('webTemplateStudio.selectSubscriptions', () => this.selectSubscriptions().catch(console.error)));
		subscriptions.push(this.api.onSessionsChanged(() => this.updateSubscriptions().catch(console.error)));
		subscriptions.push(this.api.onSubscriptionsChanged(() => this.updateFilters()));
		subscriptions.push(workspace.onDidChangeConfiguration(e => {
			if (e.affectsConfiguration('azure.cloud') || e.affectsConfiguration('azure.tenant')) {
				const doLogin = this.doLogin;
				this.doLogin = false;
				this.initialize(e.affectsConfiguration('azure.cloud') ? 'cloudChange' : 'tenantChange', doLogin)
					.catch(console.error);
			} else if (e.affectsConfiguration('azure.resourceFilter')) {
				this.updateFilters(true);
			}
		}));
		this.initialize('activation', false, true)
			.catch(console.error);

		if (logVerbose) {
			const outputChannel = window.createOutputChannel('Azure Account');
			subscriptions.push(outputChannel);
			this.enableLogging(outputChannel);
		}
	}

	private enableLogging(channel: OutputChannel) {
		Logging.setLoggingOptions({
			level: 3 /* Logging.LOGGING_LEVEL.VERBOSE */,
			log: (level: any, message: any, error: any) => {
				if (message) {
					channel.appendLine(message);
				}
				if (error) {
					channel.appendLine(error);
				}
			}
		});
	}

	api: AzureAccount = {
		status: 'Initializing',
		onStatusChanged: this.onStatusChanged.event,
		waitForLogin: () => this.waitForLogin(),
		sessions: [],
		onSessionsChanged: this.onSessionsChanged.event,
		subscriptions: [],
		onSubscriptionsChanged: this.onSubscriptionsChanged.event,
		waitForSubscriptions: () => this.waitForSubscriptions(),
		filters: [],
		onFiltersChanged: this.onFiltersChanged.event,
		waitForFilters: () => this.waitForFilters(),
		//createCloudShell: os => createCloudConsole(this.api, this.reporter, os)
	};

	async login(trigger: LoginTrigger) {
		let path: CodePath = 'newLogin';
		let environmentName = 'uninitialized';
		const cancelSource = new CancellationTokenSource();
		try {
			const environment = getSelectedEnvironment();
			environmentName = environment.name;
			const online = becomeOnline(environment, 2000, cancelSource.token);
			const timer = delay(2000, true);
			if (await Promise.race([ online, timer ])) {
				const cancel = { title: localize('azure-account.cancel', "Cancel") };
				await Promise.race([
					online,
					window.showInformationMessage(localize('azure-account.checkNetwork', "You appear to be offline. Please check your network connection."), cancel)
						.then(result => {
							if (result === cancel) {
								throw new AzureLoginError(localize('azure-account.offline', "Offline"));
							}
						})
				]);
				await online;
			}
			this.beginLoggingIn();
			const tenantId = getTenantId();
			const useCodeFlow = trigger !== 'loginWithDeviceCode' && await codeFlowLogin.checkRedirectServer();
			path = useCodeFlow ? 'newLoginCodeFlow' : 'newLoginDeviceCode';
			const tokenResponse = await (useCodeFlow ? codeFlowLogin.login(clientId, environment, tenantId, openUri) : deviceLogin(environment, tenantId));
			const refreshToken = tokenResponse.refreshToken!;
			const tokenResponses = tenantId === commonTenantId ? await tokensFromToken(environment, tokenResponse) : [tokenResponse];
			await storeRefreshToken(environment, refreshToken);
			await this.updateSessions(environment, tokenResponses);
			this.sendLoginTelemetry(trigger, path, environmentName, 'success');
		} catch (err) {
			if (err instanceof AzureLoginError && err.reason) {
				console.error(err.reason);
				this.sendLoginTelemetry(trigger, path, environmentName, 'error', getErrorMessage(err.reason) || getErrorMessage(err));
			} else {
				this.sendLoginTelemetry(trigger, path, environmentName, 'failure', getErrorMessage(err));
			}
			throw err;
		} finally {
			cancelSource.cancel();
			cancelSource.dispose();
			this.updateStatus();
		}
	}

	sendLoginTelemetry(trigger: LoginTrigger, path: CodePath, cloud: string, outcome: string, message?: string) {
		/* __GDPR__
		   "login" : {
			  "trigger" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
			  "path": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
			  "cloud" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
			  "outcome" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
			  "message": { "classification": "CallstackOrException", "purpose": "PerformanceAndHealth" }
		   }
		 */
		const event: Record<string, string> = { trigger, path, cloud, outcome };
		if (message) {
			event.message = message;
		}
		this.reporter.sendTelemetryEvent('login', event);
	}

	async logout() {
		await this.api.waitForLogin();
		for (const name of staticEnvironmentNames) {
			await deleteRefreshToken(name);
		}
		await this.clearSessions();
		this.updateStatus();
	}

	async loginToCloud(): Promise<void> {
		const current = getSelectedEnvironment();
		const selected = await window.showQuickPick(getEnvironments().map(environment => ({
			label: environmentLabels[environment.name],
			description: environment.name === current.name ? localize('azure-account.currentCloud', '(Current)') : undefined,
			environment
		})), {
				placeHolder: localize('azure-account.chooseCloudToLogin', "Choose cloud to sign in to")
			});
		if (selected) {
			const config = workspace.getConfiguration('azure');
			if (config.get('cloud') !== selected.environment.name) {
				this.doLogin = true;
				config.update('cloud', selected.environment.name, getCurrentTarget(config.inspect('cloud')));
			} else {
				return this.login('loginToCloud');
			}
		}
	}

	private async initialize(trigger: LoginTrigger, doLogin?: boolean, migrateToken?: boolean) {
		let environmentName = 'uninitialized';
		try {
			const timing = false;
			const start = Date.now();
			this.loadCache();
			timing && console.log(`loadCache: ${(Date.now() - start) / 1000}s`);
			const environment = getSelectedEnvironment();
			environmentName = environment.name;
			const tenantId = getTenantId();
			const refreshToken = await getRefreshToken(environment, migrateToken);
			timing && console.log(`keytar: ${(Date.now() - start) / 1000}s`);
			if (!refreshToken) {
				throw new AzureLoginError(localize('azure-account.refreshTokenMissing', "Not signed in"));
			}
			await becomeOnline(environment, 5000);
			this.beginLoggingIn();
			const tokenResponse = await tokenFromRefreshToken(environment, refreshToken, tenantId);
			timing && console.log(`tokenFromRefreshToken: ${(Date.now() - start) / 1000}s`);
			// For testing
			if (workspace.getConfiguration('azure').get('testTokenFailure')) {
				throw new AzureLoginError(localize('azure-account.testingAquiringTokenFailed', "Testing: Acquiring token failed"));
			}
			const tokenResponses = tenantId === commonTenantId ? await tokensFromToken(environment, tokenResponse) : [tokenResponse];
			timing && console.log(`tokensFromToken: ${(Date.now() - start) / 1000}s`);
			await this.updateSessions(environment, tokenResponses);
			timing && console.log(`updateSessions: ${(Date.now() - start) / 1000}s`);
			this.sendLoginTelemetry(trigger, 'tryExisting', environmentName, 'success');
		} catch (err) {
			await this.clearSessions(); // clear out cached data
			if (err instanceof AzureLoginError && err.reason) {
				this.sendLoginTelemetry(trigger, 'tryExisting', environmentName, 'error', getErrorMessage(err.reason) || getErrorMessage(err));
			} else {
				this.sendLoginTelemetry(trigger, 'tryExisting', environmentName, 'failure', getErrorMessage(err));
			}
			if (doLogin) {
				await this.login(trigger);
			}
		} finally {
			this.updateStatus();
		}
	}

	private loadCache() {
		const cache = this.context.globalState.get<Cache>('cache');
		if (cache) {
			(<AzureAccountWriteable>this.api).status = 'LoggedIn';
			const sessions = this.initializeSessions(cache);
			const subscriptions = this.initializeSubscriptions(cache, sessions);
			this.initializeFilters(subscriptions);
		}
	}

	private updateCache() {
		if (this.api.status !== 'LoggedIn') {
			this.context.globalState.update('cache', undefined);
			return;
		}
		const cache: Cache = {
			subscriptions: this.api.subscriptions.map(({ session, subscription }) => ({
				session: {
					environment: session.environment.name,
					userId: session.userId,
					tenantId: session.tenantId
				},
				subscription
			}))
		}
		this.context.globalState.update('cache', cache);
	}

	private beginLoggingIn() {
		if (this.api.status !== 'LoggedIn') {
			(<AzureAccountWriteable>this.api).status = 'LoggingIn';
			this.onStatusChanged.fire(this.api.status);
		}
	}

	private updateStatus() {
		const status = this.api.sessions.length ? 'LoggedIn' : 'LoggedOut';
		if (this.api.status !== status) {
			(<AzureAccountWriteable>this.api).status = status;
			this.onStatusChanged.fire(this.api.status);
		}
	}

	private initializeSessions(cache: Cache) {
		const sessions: Record<string, AzureSession> = {};
		for (const { session } of cache.subscriptions) {
			const { environment, userId, tenantId } = session;
			const key = `${environment} ${userId} ${tenantId}`;
			if (!sessions[key]) {
				sessions[key] = {
					environment: (<any>AzureEnvironment)[environment],
					userId,
					tenantId,
					credentials: new DeviceTokenCredentials({ environment: (<any>AzureEnvironment)[environment], username: userId, clientId, tokenCache: this.delayedCache, domain: tenantId })
				};
				this.api.sessions.push(sessions[key]);
			}
		}
		return sessions;
	}

	private async updateSessions(environment: AzureEnvironment, tokenResponses: TokenResponse[]) {
		await clearTokenCache(this.tokenCache);
		for (const tokenResponse of tokenResponses) {
			await addTokenToCache(environment, this.tokenCache, tokenResponse);
		}
		this.delayedCache.initEnd!();
		const sessions = this.api.sessions;
		sessions.splice(0, sessions.length, ...tokenResponses.map<AzureSession>(tokenResponse => ({
			environment,
			userId: tokenResponse.userId!,
			tenantId: tokenResponse.tenantId!,
			credentials: new DeviceTokenCredentials({ environment: environment, username: tokenResponse.userId, clientId, tokenCache: this.delayedCache, domain: tokenResponse.tenantId })
		})));
		this.onSessionsChanged.fire();
	}

	private async clearSessions() {
		await clearTokenCache(this.tokenCache);
		this.delayedCache.initEnd!();
		const sessions = this.api.sessions;
		sessions.length = 0;
		this.onSessionsChanged.fire();
	}

	private async waitForSubscriptions() {
		if (!(await this.api.waitForLogin())) {
			return false;
		}
		await this.subscriptions;
		return true;
	}

	private initializeSubscriptions(cache: Cache, sessions: Record<string, AzureSession>) {
		const subscriptions = cache.subscriptions.map<AzureSubscription>(({ session, subscription }) => {
			const { environment, userId, tenantId } = session;
			const key = `${environment} ${userId} ${tenantId}`;
			return {
				session: sessions[key],
				subscription
			};
		});
		this.subscriptions = Promise.resolve(subscriptions);
		this.api.subscriptions.push(...subscriptions);
		return subscriptions;
	}

	private async updateSubscriptions() {
		await this.api.waitForLogin();
		this.subscriptions = this.loadSubscriptions();
		this.api.subscriptions.splice(0, this.api.subscriptions.length, ...await this.subscriptions);
		this.updateCache();
		this.onSubscriptionsChanged.fire();
	}

	private async askForLogin() {
		if (this.api.status === 'LoggedIn') {
			return;
		}
		const login = { title: localize('webTemplateStudio.login', "Sign In") };
		const result = await window.showInformationMessage(localize('webTemplateStudio.loginFirst', "Not signed in, sign in first."), login);
		return result === login && commands.executeCommand('webTemplateStudio.login');
	}

	private async selectSubscriptions() {
		if (!(await this.waitForSubscriptions())) {
			return commands.executeCommand('webTemplateStudio.askForLogin');
		}

		const azureConfig = workspace.getConfiguration('azure');
		const resourceFilter = (azureConfig.get<string[]>('resourceFilter') || ['all']).slice();
		let changed = false;

		const subscriptions = this.subscriptions
			.then(list => this.asSubscriptionItems(list, resourceFilter));
		const source = new CancellationTokenSource();
		const cancellable = subscriptions.then(s => {
			if (!s.length) {
				source.cancel();
				this.noSubscriptionsFound()
					.catch(console.error);
			}
			return s;
		});
		const picks = await window.showQuickPick(cancellable, { canPickMany: true, placeHolder: 'Select Subscriptions' }, source.token);
		if (picks) {
			if (resourceFilter[0] === 'all') {
				resourceFilter.splice(0, 1);
				for (const subscription of await subscriptions) {
					this.addFilter(resourceFilter, subscription);
				}
			}
			for (const subscription of await subscriptions) {
				if (subscription.picked !== (picks.indexOf(subscription) !== -1)) {
					changed = true;
					if (subscription.picked) {
						this.removeFilter(resourceFilter, subscription);
					} else {
						this.addFilter(resourceFilter, subscription);
					}
				}
			}
		}

		if (changed) {
			await this.updateConfiguration(azureConfig, resourceFilter);
		}
	}

	async noSubscriptionsFound(): Promise<void> {
		const open: MessageItem = { title: localize('azure-account.open', "Open") };
		const response = await window.showInformationMessage(localize('azure-account.noSubscriptionsFound', "No subscriptions were found. Set up your account at https://azure.microsoft.com/en-us/free/."), open);
		if (response === open) {
			commands.executeCommand('vscode.open', Uri.parse('https://azure.microsoft.com/en-us/free/?utm_source=campaign&utm_campaign=vscode-azure-account&mktingSource=vscode-azure-account'));
		}
	}

	private addFilter(resourceFilter: string[], item: SubscriptionItem) {
		const { session, subscription } = item.subscription;
		resourceFilter.push(`${session.tenantId}/${subscription.subscriptionId}`);
		item.picked = true;
	}

	private removeFilter(resourceFilter: string[], item: SubscriptionItem) {
		const { session, subscription } = item.subscription;
		const remove = resourceFilter.indexOf(`${session.tenantId}/${subscription.subscriptionId}`);
		resourceFilter.splice(remove, 1);
		item.picked = false;
	}

	private async loadSubscriptions() {
		const lists = await Promise.all(this.api.sessions.map(session => {
			const credentials = session.credentials;
			const client = new SubscriptionClient.SubscriptionClient(credentials, session.environment.resourceManagerEndpointUrl);
			return listAll(client.subscriptions, client.subscriptions.list())
				.then(list => list.map(subscription => ({
					session,
					subscription,
				})));
		}));
		const subscriptions = (<AzureSubscription[]>[]).concat(...lists);
		subscriptions.sort((a, b) => a.subscription.displayName!.localeCompare(b.subscription.displayName!));
		return subscriptions;
	}

	private asSubscriptionItems(subscriptions: AzureSubscription[], resourceFilter: string[]): SubscriptionItem[] {
		return subscriptions.map(subscription => {
			const picked = resourceFilter.indexOf(`${subscription.session.tenantId}/${subscription.subscription.subscriptionId}`) !== -1 || resourceFilter[0] === 'all';
			return <SubscriptionItem>{
				type: 'item',
				label: subscription.subscription.displayName,
				description: subscription.subscription.subscriptionId!,
				subscription,
				picked,
			};
		});
	}

	private async updateConfiguration(azureConfig: WorkspaceConfiguration, resourceFilter: string[]) {
		const resourceFilterConfig = azureConfig.inspect<string[]>('resourceFilter');
		const target = getCurrentTarget(resourceFilterConfig);
		await azureConfig.update('resourceFilter', resourceFilter[0] !== 'all' ? resourceFilter : undefined, target);
	}

	private initializeFilters(subscriptions: AzureSubscription[]) {
		const azureConfig = workspace.getConfiguration('azure');
		const resourceFilter = azureConfig.get<string[]>('resourceFilter');
		this.oldResourceFilter = JSON.stringify(resourceFilter);
		const newFilters = this.newFilters(subscriptions, resourceFilter);
		this.filters = Promise.resolve(newFilters);
		this.api.filters.push(...newFilters);
	}

	private updateFilters(configChange = false) {
		const azureConfig = workspace.getConfiguration('azure');
		const resourceFilter = azureConfig.get<string[]>('resourceFilter');
		if (configChange && JSON.stringify(resourceFilter) === this.oldResourceFilter) {
			return;
		}
		this.filters = (async () => {
			await this.waitForSubscriptions();
			const subscriptions = await this.subscriptions;
			this.oldResourceFilter = JSON.stringify(resourceFilter);
			const newFilters = this.newFilters(subscriptions, resourceFilter);
			this.api.filters.splice(0, this.api.filters.length, ...newFilters);
			this.onFiltersChanged.fire();
			return this.api.filters;
		})();
	}

	private newFilters(subscriptions: AzureSubscription[], resourceFilter: string[] | undefined): AzureResourceFilter[] {
		if (resourceFilter && !Array.isArray(resourceFilter)) {
			resourceFilter = [];
		}
		const filters = resourceFilter && resourceFilter.reduce((f, s) => {
			if (typeof s === 'string') {
				f[s] = true;
			}
			return f;
		}, <Record<string, boolean>>{});

		return filters ? subscriptions.filter(s => filters[`${s.session.tenantId}/${s.subscription.subscriptionId}`]) : subscriptions;
	}

	private async waitForLogin() {
		switch (this.api.status) {
			case 'LoggedIn':
				return true;
			case 'LoggedOut':
				return false;
			case 'Initializing':
			case 'LoggingIn':
				return new Promise<boolean>(resolve => {
					const subscription = this.api.onStatusChanged(() => {
						subscription.dispose();
						resolve(this.waitForLogin());
					});
				});
			default:
				const status: never = this.api.status;
				throw new Error(`Unexpected status '${status}'`);
		}
	}

	private async waitForFilters() {
		if (!(await this.waitForSubscriptions())) {
			return false;
		}
		await this.filters;
		return true;
	}
}

function getSelectedEnvironment(): AzureEnvironment {
	const envConfig = workspace.getConfiguration('azure');
	const envSetting = envConfig.get<string>('cloud');
	return getEnvironments().find(environment => environment.name === envSetting) || AzureEnvironment.Azure;
}

function getEnvironments() {
	const config = workspace.getConfiguration('azure');
	const ppe = config.get<AzureEnvironment>('ppe');
	if (ppe) {
		return [
			...staticEnvironments,
			{
				...ppe,
				name: azurePPE
			}
		]
	} else {
		return staticEnvironments;
	}
}

function getTenantId() {
	const envConfig = workspace.getConfiguration('azure');
	return envConfig.get<string>('tenant') || commonTenantId;
}

async function deviceLogin(environment: AzureEnvironment, tenantId: string) {
	const deviceLogin = await deviceLogin1(environment, tenantId);
	const message = showDeviceCodeMessage(deviceLogin);
	const login2 = deviceLogin2(environment, tenantId, deviceLogin);
	return Promise.race([login2, message.then(() => Promise.race([login2, timeout(3 * 60 * 1000)]))]); // 3 minutes
}

async function showDeviceCodeMessage(deviceLogin: UserCodeInfo): Promise<void> {
	const copyAndOpen: MessageItem = { title: localize('azure-account.copyAndOpen', "Copy & Open") };
	const response = await window.showInformationMessage(deviceLogin.message, copyAndOpen);
	if (response === copyAndOpen) {
		env.clipboard.writeText(deviceLogin.userCode);
		await openUri(deviceLogin.verificationUrl);
	} else {
		return Promise.reject('user canceled');
	}
}

async function deviceLogin1(environment: AzureEnvironment, tenantId: string): Promise<UserCodeInfo> {
	return new Promise<UserCodeInfo>((resolve, reject) => {
		const cache = new MemoryCache();
		const context = new AuthenticationContext(`${environment.activeDirectoryEndpointUrl}${tenantId}`, validateAuthority, cache);
		context.acquireUserCode(environment.activeDirectoryResourceId, clientId, 'en-us', (err, response) => {
			if (err) {
				reject(new AzureLoginError(localize('azure-account.userCodeFailed', "Acquiring user code failed"), err));
			} else {
				resolve(response);
			}
		});
	});
}

async function deviceLogin2(environment: AzureEnvironment, tenantId: string, deviceLogin: UserCodeInfo) {
	return new Promise<TokenResponse>((resolve, reject) => {
		const tokenCache = new MemoryCache();
		const context = new AuthenticationContext(`${environment.activeDirectoryEndpointUrl}${tenantId}`, validateAuthority, tokenCache);
		context.acquireTokenWithDeviceCode(`${environment.managementEndpointUrl}`, clientId, deviceLogin, (err, tokenResponse) => {
			if (err) {
				reject(new AzureLoginError(localize('azure-account.tokenFailed', "Acquiring token with device code failed"), err));
			} else if (tokenResponse.error) {
				reject(new AzureLoginError(localize('azure-account.tokenFailed', "Acquiring token with device code failed"), tokenResponse));
			} else {
				resolve(<TokenResponse>tokenResponse);
			}
		});
	});
}

export async function tokenFromRefreshToken(environment: AzureEnvironment, refreshToken: string, tenantId: string, resource?: string) {
	return new Promise<TokenResponse>((resolve, reject) => {
		const tokenCache = new MemoryCache();
		const context = new AuthenticationContext(`${environment.activeDirectoryEndpointUrl}${tenantId}`, validateAuthority, tokenCache);
		context.acquireTokenWithRefreshToken(refreshToken, clientId, <any>resource, (err, tokenResponse) => {
			if (err) {
				reject(new AzureLoginError(localize('azure-account.tokenFromRefreshTokenFailed', "Acquiring token with refresh token failed"), err));
			} else if (tokenResponse.error) {
				reject(new AzureLoginError(localize('azure-account.tokenFromRefreshTokenFailed', "Acquiring token with refresh token failed"), tokenResponse));
			} else {
				resolve(<TokenResponse>tokenResponse);
			}
		});
	});
}

async function tokensFromToken(environment: AzureEnvironment, firstTokenResponse: TokenResponse) {
	const tokenCache = new MemoryCache();
	await addTokenToCache(environment, tokenCache, firstTokenResponse);
	const credentials = new DeviceTokenCredentials({ username: firstTokenResponse.userId, clientId, tokenCache, environment });
	const client = new SubscriptionClient.SubscriptionClient(credentials, environment.resourceManagerEndpointUrl);
	const tenants = await listAll(client.tenants, client.tenants.list());
	const responses = <TokenResponse[]>(await Promise.all<TokenResponse | null>(tenants.map((tenant, i) => {
		if (tenant.tenantId === firstTokenResponse.tenantId) {
			return firstTokenResponse;
		}
		return tokenFromRefreshToken(environment, firstTokenResponse.refreshToken!, tenant.tenantId!)
			.catch(err => {
				console.error(err instanceof AzureLoginError && err.reason ? err.reason : err);
				return null;
			});
	}))).filter(r => r);
	if (!responses.some(response => response.tenantId === firstTokenResponse.tenantId)) {
		responses.unshift(firstTokenResponse);
	}
	return responses;
}

async function addTokenToCache(environment: AzureEnvironment, tokenCache: any, tokenResponse: TokenResponse) {
	return new Promise<any>((resolve, reject) => {
		const driver = new CacheDriver(
			{ _logContext: createLogContext('') },
			`${environment.activeDirectoryEndpointUrl}${tokenResponse.tenantId}`,
			tokenResponse.resource,
			clientId,
			tokenCache,
			(entry: any, resource: any, callback: (err: any, response: any) => {}) => {
				callback(null, entry);
			}
		);
		driver.add(tokenResponse, function (err: any) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

async function clearTokenCache(tokenCache: any) {
	await new Promise<void>((resolve, reject) => {
		tokenCache.find({}, (err: any, entries: any[]) => {
			if (err) {
				reject(err);
			} else {
				tokenCache.remove(entries, (err: any) => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			}
		});
	});
}

export interface PartialList<T> extends Array<T> {
	nextLink?: string;
}

export async function listAll<T>(client: { listNext(nextPageLink: string): Promise<PartialList<T>>; }, first: Promise<PartialList<T>>): Promise<T[]> {
	const all: T[] = [];
	for (let list = await first; list.length || list.nextLink; list = list.nextLink ? await client.listNext(list.nextLink) : []) {
		all.push(...list);
	}
	return all;
}

function getCurrentTarget(config: { key: string; defaultValue?: unknown; globalValue?: unknown; workspaceValue?: unknown, workspaceFolderValue?: unknown } | undefined) {
	if (config) {
		if (config.workspaceFolderValue) {
			return ConfigurationTarget.WorkspaceFolder;
		} else if (config.workspaceValue) {
			return ConfigurationTarget.Workspace;
		} else if (config.globalValue) {
			return ConfigurationTarget.Global;
		}
	}
	return ConfigurationTarget.Global;
}


function timeout(ms: number, result: any = 'timeout') {
	return new Promise<never>((_, reject) => setTimeout(() => reject(result), ms));
}

function delay<T = void>(ms: number, result?: T) {
	return new Promise<T>(resolve => setTimeout(() => resolve(result), ms));
}

function getErrorMessage(err: any): string | undefined {
	if (!err) {
		return;
	}

	if (err.message && typeof err.message === 'string') {
		return err.message;
	}

	if (err.stack && typeof err.stack === 'string') {
		return err.stack.split('\n')[0];
	}

	const str = String(err);
	if (!str || str === '[object Object]') {
		const ctr = err.constructor;
		if (ctr && ctr.name && typeof ctr.name === 'string') {
			return ctr.name;
		}
	}

	return str;
}

async function becomeOnline(environment: AzureEnvironment, interval: number, token = new CancellationTokenSource().token) {
	let o = isOnline(environment);
	let d = delay(interval, false);
	while (!token.isCancellationRequested && !await Promise.race([o, d])) {
		await d;
		o = asyncOr(o, isOnline(environment));
		d = delay(interval, false);
	}
}

async function isOnline(environment: AzureEnvironment) {
	let host = 'login.microsoftonline.com';
	try {
		const uri = Uri.parse(environment.activeDirectoryEndpointUrl);
		host = uri.authority;
	} catch (err) {
		// ignore
	}
	try {
		await promisify(dns.resolve)(host);
		return true;
	} catch (err) {
		return false;
	}
}

async function asyncOr<A, B>(a: Promise<A>, b: Promise<B>) {
	return Promise.race([awaitAOrB(a, b), awaitAOrB(b, a)]);
}

async function awaitAOrB<A, B>(a: Promise<A>, b: Promise<B>) {
	return (await a) || b;
}

async function openUri(uri: string) {
	return commands.executeCommand<void>('vscode.open', Uri.parse(uri));
}