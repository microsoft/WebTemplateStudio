import * as vscode from "vscode";
import { ReactPanel } from "./reactPanel";
import { FunctionProvider } from "./azure-functions/functionProvider";
import { ValidationError, DeploymentError, AuthorizationError } from "./errors";
import ApiModule from "./ApiModule";
import { ChildProcess } from "child_process";

let apiProcess: ChildProcess;
export function activate(context: vscode.ExtensionContext) {
  //Launch the client wizard assuming it has been built
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
  // replace these with actual values from your portal to test! Saves the function app folder to your Documents folder
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.createFunctionApp",
      () => {
        FunctionProvider.createFunctionApp(
          {
            functionAppName: "YOUR_UNIQUE_FUNCTION_APP_NAME",
            subscriptionId: "YOUR_SUBSCRIPTION_ID",
            location: "YOUR_LOCATION",
            runtime: "YOUR_RUNTIME",
            resourceGroupName: "YOUR_RESOURCE_GROUP",
            functionNames: ["function1", "function2", "function3"]
          },
          require("path").join(require("os").homedir(), "Documents")
        ).catch(err => {
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
          }
        });
      }
    )
  );

  // Check function name availability
  // NOT IMPLEMENTED YET
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.checkFunctionAppName",
      (appName: string) => {
        FunctionProvider.checkFunctionAppName(appName)
          .then(result => {
            // result is either true or false
            vscode.window.showInformationMessage(
              "Function App Name: " + name + "\nAvailable: " + String(result)
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
  console.log("Kill api process");
}
