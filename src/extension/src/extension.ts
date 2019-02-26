import * as vscode from "vscode";
import { ReactPanel } from "./reactPanel";
import ApiModule from "./apiModule";
import { ChildProcess } from "child_process";
import { FunctionProvider } from "./azure-functions/functionProvider";
import { ValidationError, DeploymentError, AuthorizationError } from "./errors";
import {
	AzureAuth,
	SubscriptionItem,
	ResourceGroupItem
} from "./azure-auth/azureAuth";

let apiProcess: ChildProcess;

export function activate(context: vscode.ExtensionContext) {

	// Launch the client wizard assuming it has been built
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"webTemplateStudioExtension.wizardLaunch",
			() => {
				apiProcess = ApiModule.StartApi(context);
				console.log(apiProcess.pid);
				ReactPanel.createOrShow(context.extensionPath);
			}
		)
	);

	// NOTE: These functions are registered temporarily to debug functionality until wizard is ready,
	// the real call will be made by wizard through webview API!

	let functionProvider: FunctionProvider = new FunctionProvider();

	// NOTE: These can only be used after launch is called!

	// Deploy a function app
	// fill a function app name and location here! Saves the function app folder to your Documents folder
	context.subscriptions.push(vscode.commands.registerCommand(
		'webTemplateStudioExtension.createFunctionApp', async () => {
			let subscriptionItem: SubscriptionItem = await tempGetSubscription("GiV.Hackathon");
			let resourceGroupItem: ResourceGroupItem = await tempGetResourceGroup("GIV.W19.WTS", "GiV.Hackathon");

			functionProvider.createFunctionApp(
				{
					functionAppName: "YOUR-UNIQUE-FUNCTION-APP-NAME",
					subscriptionItem: subscriptionItem,
					location: "West US",
					runtime: "node",
					resourceGroupItem: resourceGroupItem,
					functionNames: ["function1", "function2", "function3"]
				},
				require('path').join(require("os").homedir(), 'Documents')
			)
				.catch((err) => {
					// error handling here
					// example:
					switch (err.constructor) {
						case ValidationError:
							console.log(err);
							break;
						case DeploymentError:
							console.log(err);
							break;
						case AuthorizationError:
							console.log(err);
							break;
						default:
							console.log(err);
							break;
					}
				});
		}
	));
}

export function deactivate() {
	// This will ensure all pending events get flushed
	apiProcess.kill();
}

// temporary function that returns the Subscription Item for given subscription name
async function tempGetSubscription(name: string): Promise<SubscriptionItem> {
	let subItem: SubscriptionItem = <SubscriptionItem>{};

	await AzureAuth.getSubscriptions().then(items => {
		for (let item of items) {
			if (item.label === name) {
				subItem = item;
				break;
			}
		}
	});

	return subItem;
}

// temporary function that returns the ResourceGroup Item for given resource and subscription name
async function tempGetResourceGroup(
	name: string,
	subscription: string
): Promise<ResourceGroupItem> {
	let resItem: ResourceGroupItem = <ResourceGroupItem>{};

	await AzureAuth.getResourceGroupItems(
		await tempGetSubscription(subscription)
	).then(items => {
		for (let item of items) {
			if (item.name === name) {
				resItem = item;
			}
		}
	});

	return resItem;
}
