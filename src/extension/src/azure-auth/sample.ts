import { AzureAuth } from './AzureAuth';
import * as vscode from 'vscode';

export function logResourceGroups() {
    /**
     * Sampel usage of Azure Auth class
     */
    AzureAuth.getSubscriptions().then(
        (items) => {
            items.forEach(subscriptionItem => {
                vscode.window.showInformationMessage(subscriptionItem.subscriptionId);
                AzureAuth.getResourceGroupItems(subscriptionItem).then((groups) => {
                    groups.forEach(resourceGroup => {
                        vscode.window.showInformationMessage("Resource Group:" + resourceGroup.name);
                    });
                });
            });
        }
    );
}