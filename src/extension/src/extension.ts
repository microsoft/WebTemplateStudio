import * as vscode from "vscode";
import { ReactPanel } from "./ReactPanelBuilder";
import { createFunctionApp, checkFunctionAppName } from './azure-functions/functions';
import { Runtime } from './azure-functions/functionProvider';

// temporary import until wizard calls functions app
import * as appRoot from 'app-root-path';

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
	
	// these functions would be used as webview messages later,
	// temporarily registered here for testing

  // for debugging purporses only
  // the JSON and path being passed to the function would actually
  // be returned by the wizard
	context.subscriptions.push(vscode.commands.registerCommand(
		'webTemplateStudioExtension.createFunctionApp', () => {createFunctionApp(
			{functionAppName: "project-acorn-test",
			subscriptionId: "31add260-f4a3-497d-8b39-e35101c87f55",
			location: "West US",
			runtime: Runtime.node,
			resourceGroupName: "GIV_W19_WTS",
			storageId: "teamwts",
			functionNames: ["httpTrigger1", "httpTrigger2", "httpTrigger3"]}, 
			appRoot.toString());
		}
	));
	
	// check function name availability, this shows true/false as a toast
	context.subscriptions.push(vscode.commands.registerCommand(
		'webTemplateStudioExtension.checkFunctionAppName', (appName: string) => {
			vscode.window.showInformationMessage(String(checkFunctionAppName(appName)));
		}
	));
}