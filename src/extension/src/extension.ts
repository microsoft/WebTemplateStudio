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

  // NOTE: These can only be used after launch is called!

  // Deploy a function app
  // fill a function app name and location here! Saves the function app folder to your Documents folder
  context.subscriptions.push(vscode.commands.registerCommand(
    'webTemplateStudioExtension.createFunctionApp', async (appName: string | undefined) => {
      let subscriptionItem: SubscriptionItem = await tempGetSubscription("GiV.Hackathon");
      let resourceGroupItem: ResourceGroupItem = await tempGetResourceGroup("GIV.W19.WTS", "GiV.Hackathon");

      while (!appName) {
        await vscode.window.showInputBox().then(async (value) => {
          await FunctionProvider.checkFunctionAppName(value!, subscriptionItem)
            .then(result => {
              if (!result) {
                vscode.window.showErrorMessage(`Function app name ${value!} not available`);
              } else {
                appName = value!;
                vscode.window.showInformationMessage(`Deploying function ${appName}!`);
              }
            })
            .catch(err => {
              console.log(err);
              // error handling here
            });
        });
      }

      await FunctionProvider.createFunctionApp(
        {
          functionAppName: appName,
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

  // Check function name availability, asks user for function app name as input and returns availability as a toast
  // only for testing
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.checkFunctionAppName",
      async (appName: string) => {
        if (!appName) {
          await vscode.window.showInputBox().then(value => (appName = value!));
        }
        FunctionProvider.checkFunctionAppName(
          appName,
          await tempGetSubscription("GiV.Hackathon")
        )
          .then(result => {
            // result is either true or false
            vscode.window.showInformationMessage(
              "Function App Name: " + appName + "\nAvailable: " + String(result)
            );
          })
          .catch(err => {
            console.log(err);
            // error handling here
          });
      }
    )
  );
}

export function deactivate() {
  // This will ensure all pending events get flushed
  apiProcess.kill();
}

// temporary function that returns the Subscription Item for given subscription name
export async function tempGetSubscription(name: string): Promise<SubscriptionItem> {
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
export async function tempGetResourceGroup(
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
