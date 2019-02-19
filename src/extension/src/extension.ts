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
	// TEMPORARILY registered here for testing

	// NOTE: these can only be used after wizardLaunch is called

  // for debugging purporses only
  // the JSON and path being passed to the function would actually
	// be returned by the wizard
	// change the name to a name for function app that hasn't be taken (the wizard would use checkFunctionAppName for this)
	// set the subscriptionId as an env variable (use GIV.Hackathon's for testing)
	context.subscriptions.push(vscode.commands.registerCommand(
		'webTemplateStudioExtension.createFunctionApp', () => {createFunctionApp(
			{functionAppName: "project-acorn-test",
			subscriptionId: String(process.env.SUBSCRIPTION_ID),
			location: "West US",
			runtime: Runtime.node,
			resourceGroupName: "GIV_W19_WTS",
			storageId: "teamwts",
			functionNames: ["httpTrigger1", "httpTrigger2", "httpTrigger3"]}, 
			appRoot.toString());
		}
	));
	
	// check function name availability, this shows true/false as a toast
	// not implemented yet
	context.subscriptions.push(vscode.commands.registerCommand(
		'webTemplateStudioExtension.checkFunctionAppName', (appName: string) => {
			vscode.window.showInformationMessage(String(checkFunctionAppName(appName)));
		}
	));
}