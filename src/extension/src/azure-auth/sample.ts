import { AzureAuth } from "./azureAuth";
import * as vscode from "vscode";

export function logResourceGroups() {
  /**
   * Sample usage of Azure Auth class
   */
  AzureAuth.getSubscriptions().then(items => {
    items.forEach(subscriptionItem => {
      vscode.window.showInformationMessage(subscriptionItem.subscriptionId);
      AzureAuth.getResourceGroupItems(subscriptionItem).then(groups => {
        groups.forEach(resourceGroup => {
          vscode.window.showInformationMessage(
            "Resource Group:" + resourceGroup.name
          );
        });
      });
    });
  });
}
