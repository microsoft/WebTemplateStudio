import * as vscode from "vscode";
import { ReactPanel } from "./ReactPanelBuilder";

import { AzureAuth } from './AzureAuthModule';


export function activate(context: vscode.ExtensionContext) {
  //Launch the client wizard assuming it has been built

  // const azureAccount = extensions.getExtension<AzureAccount>('ms-vscode.azure-account')!.exports;
  // const subscriptions = context.subscriptions;

  const azureAuth = new AzureAuth(context);

  var creds = azureAuth.getCredentials();

  var subs = azureAuth.getSubscriptionItems();

  console.log(subs);

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.wizardLaunch",
      () => {
        ReactPanel.createOrShow(context.extensionPath);
      }
    )
  );
}