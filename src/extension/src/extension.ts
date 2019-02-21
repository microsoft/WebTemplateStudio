import * as vscode from "vscode";
import { ReactPanel } from "./reactPanel";
import { FunctionProvider } from './azure-functions/functionProvider';
import { ValidationError, DeploymentError, AuthorizationError } from './errors';
import { AzureAuth, SubscriptionItem, ResourceGroupItem } from './azure-auth/AzureAuth';

export function activate(context: vscode.ExtensionContext) {
  //Launch the client wizard assuming it has been built
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.wizardLaunch",
      () => {
        ReactPanel.createOrShow(context.extensionPath);
      }
    )
	);
	

	// NOTE: These functions are registered temporarily to debug functionality until wizard is ready, 
	// the real call will be made by wizard through webview API!

	// NOTE: These can only be used after launch is called!

	// Deploy a function app
	// fill a function app name and location here! Saves the function app folder to your Documents folder
	context.subscriptions.push(vscode.commands.registerCommand(
		'webTemplateStudioExtension.createFunctionApp', async () => {
			let subscriptionItem: SubscriptionItem = await tempGetSubscription("GiV.Hackathon");
			let resourceGroupItem: ResourceGroupItem = await tempGetResourceGroup("GIV_W19_WTS", "GiV.Hackathon");

			FunctionProvider.createFunctionApp(
				{
					functionAppName: "YOUR_UNIQUE_FUNCTION_APP_NAME",
					subscriptionItem: subscriptionItem,
					location: "YOUR_LOCATION",
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
	
	// Check function name availability, asks user for function app name as input and returns availability as a toast
	// only for testing
	context.subscriptions.push(vscode.commands.registerCommand(
		'webTemplateStudioExtension.checkFunctionAppName', async (appName: string) => {
			if (!appName) {
				await vscode.window.showInputBox().then(value => appName = value!);    
	 		}
			FunctionProvider.checkFunctionAppName(appName, await tempGetSubscription('GiV.Hackathon'))
			.then((result) => {
				// result is either true or false
				vscode.window.showInformationMessage("Function App Name: " + appName + "\nAvailable: " + String(result));
			})
			.catch((err) => {
				console.log(err);
				// error handling here
			});
		}
	));

}

// temporary function that returns the Subscription Item for given subscription name
async function tempGetSubscription(name: string) : Promise<SubscriptionItem> {
	let subItem: SubscriptionItem = <SubscriptionItem>{};

	await AzureAuth.getSubscriptions().then((items) => {
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
async function tempGetResourceGroup(name: string, subscription: string) : Promise<ResourceGroupItem> {	
	let resItem: ResourceGroupItem = <ResourceGroupItem>{};

	await AzureAuth.getResourceGroupItems(await tempGetSubscription(subscription)).then((items) => {
		for (let item of items) {
			if (item.name === name) {
				resItem = item;
			}
		}
	});

	return resItem;
}
