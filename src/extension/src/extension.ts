/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window, ExtensionContext, commands, Uri, workspace } from 'vscode';
import * as vscode from 'vscode';
import * as path from 'path';
import { AzureLoginHelper } from './azure-account';
import { AzureAccount } from './azure-account.api';
import { createReporter } from './telemetry';
import * as nls from 'vscode-nls';
import { survey } from './nps';

const localize = nls.loadMessageBundle();
const enableLogging = false;

export function activate(context: ExtensionContext) {
	const reporter = createReporter(context);
	const azureLogin = new AzureLoginHelper(context, reporter);
	if (enableLogging) {
		logDiagnostics(context, azureLogin.api);
	}
	const subscriptions = context.subscriptions;
	subscriptions.push(createStatusBarItem(context, azureLogin.api));
	subscriptions.push(commands.registerCommand('webTemplateStudio.createAccount', createAccount));
	subscriptions.push(commands.registerCommand('webTemplateStudio.launch', () => {ReactPanel.createOrShow(context.extensionPath);}));

	survey(context, reporter);
	return Promise.resolve(azureLogin.api); // Return promise to work around weird error in WinJS.
}

/**
 * Manages react webview panels
 */
class ReactPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: ReactPanel | undefined;

	private static readonly viewType = 'react';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionPath: string;
	private _disposables: vscode.Disposable[] = [];

	public static createOrShow(extensionPath: string) {
		const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		// If we already have a panel, show it.
		// Otherwise, create a new panel.
		if (ReactPanel.currentPanel) {
			ReactPanel.currentPanel._panel.reveal(column);
		} else {
			ReactPanel.currentPanel = new ReactPanel(extensionPath, column || vscode.ViewColumn.One);
		}
	}

	private constructor(extensionPath: string, column: vscode.ViewColumn) {
		this._extensionPath = extensionPath;

		// Create and show a new webview panel
		this._panel = vscode.window.createWebviewPanel(ReactPanel.viewType, "React", column, {
			// Enable javascript in the webview
			enableScripts: true,

			// And restric the webview to only loading content from our extension's `media` directory.
			localResourceRoots: [
				vscode.Uri.file(path.join(this._extensionPath, 'react'))
			]
		});
		
		// Set the webview's initial html content 
		this._panel.webview.html = this._getHtmlForWebview();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Handle messages from the webview
		this._panel.webview.onDidReceiveMessage(message => {
			switch (message.command) {
				case 'alert':
					vscode.window.showErrorMessage(message.text);
					return;
			}
		}, null, this._disposables);
	}

	public doRefactor() {
		// Send a message to the webview webview.
		// You can send any JSON serializable data.
		this._panel.webview.postMessage({ command: 'refactor' });
	}

	public dispose() {
		ReactPanel.currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _getHtmlForWebview() {
		const manifest = require(path.join(this._extensionPath, 'react', 'asset-manifest.json'));
		const mainScript = manifest['main.js'];
		const mainStyle = manifest['main.css'];

		const scriptPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'react', mainScript));
		const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' });
		const stylePathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'react', mainStyle));
		const styleUri = stylePathOnDisk.with({ scheme: 'vscode-resource' });

		// Use a nonce to whitelist which scripts can be run
		// const nonce = getNonce();

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<title>React App</title>
				<link rel="stylesheet" type="text/css" href="${styleUri}">
				<meta img-src vscode-resource: https: ;style-src vscode-resource: 'unsafe-inline' http: https: data:;">
				<base href="${vscode.Uri.file(path.join(this._extensionPath, 'react')).with({ scheme: 'vscode-resource' })}/">
			</head>
			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root"></div>
				<script src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}

// function getNonce() {
// 	let text = "";
// 	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
// 	for (let i = 0; i < 32; i++) {
// 		text += possible.charAt(Math.floor(Math.random() * possible.length));
// 	}
// 	return text;
// }


function logDiagnostics(context: ExtensionContext, api: AzureAccount) {
	const subscriptions = context.subscriptions;
	subscriptions.push(api.onStatusChanged(status => {
		console.log(`onStatusChanged: ${status}`);
	}));
	subscriptions.push(api.onSessionsChanged(() => {
		console.log(`onSessionsChanged: ${api.sessions.length} ${api.status}`);
	}));
	(async () => {
		console.log(`waitForLogin: ${await api.waitForLogin()} ${api.status}`);
	})().catch(console.error);
	subscriptions.push(api.onSubscriptionsChanged(() => {
		console.log(`onSubscriptionsChanged: ${api.subscriptions.length}`);
	}));
	(async () => {
		console.log(`waitForSubscriptions: ${await api.waitForSubscriptions()} ${api.subscriptions.length}`);
	})().catch(console.error);
	subscriptions.push(api.onFiltersChanged(() => {
		console.log(`onFiltersChanged: ${api.filters.length}`);
	}));
	(async () => {
		console.log(`waitForFilters: ${await api.waitForFilters()} ${api.filters.length}`);
	})().catch(console.error);
}

function createAccount() {
	return commands.executeCommand('vscode.open', Uri.parse('https://azure.microsoft.com/en-us/free/?utm_source=campaign&utm_campaign=vscode-azure-account&mktingSource=vscode-azure-account'));
}

function createStatusBarItem(context: ExtensionContext, api: AzureAccount) {
	const statusBarItem = window.createStatusBarItem();
	statusBarItem.command = "webTemplateStudio.selectSubscriptions";
	function updateStatusBar() {
		switch (api.status) {
			case 'LoggingIn':
				statusBarItem.text = localize('azure-account.loggingIn', "Azure: Signing in...");
				statusBarItem.show();
				break;
			case 'LoggedIn':
				if (api.sessions.length) {
					const azureConfig = workspace.getConfiguration('azure');
					const showSignedInEmail = azureConfig.get<boolean>('showSignedInEmail');
					statusBarItem.text = showSignedInEmail ? localize('azure-account.loggedIn', "Azure: {0}", api.sessions[0].userId) : localize('azure-account.loggedIn', "Azure: Signed In");
					statusBarItem.show();
				}
				break;
			default:
				statusBarItem.hide();
				break;
		}
	}
	context.subscriptions.push(
		statusBarItem,
		api.onStatusChanged(updateStatusBar),
		api.onSessionsChanged(updateStatusBar),
		workspace.onDidChangeConfiguration(updateStatusBar)
	);
	updateStatusBar();
	return statusBarItem;
}

