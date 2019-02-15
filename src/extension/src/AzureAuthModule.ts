import { ExtensionContext, commands, extensions } from 'vscode';
import { AzureAccount, AzureSession } from './azure-account.api'; // Other extensions need to copy this .d.ts to their repository.
import { SubscriptionClient, ResourceManagementClient, SubscriptionModels } from 'azure-arm-resource';

export interface SubscriptionItem {
    label: string;
    description: string;
    session: AzureSession;
    subscription: SubscriptionModels.Subscription;
}

export interface ResourceGroup {
    label: string;
    description: string;
}

export interface PartialList<T> extends Array<T> {
    nextLink?: string;
}

export class AzureAuth {

    api: AzureAccount;
    constructor() {
        this.api = extensions.getExtension<AzureAccount>('ms-vscode.azure-account')!.exports;
    }

    public getCredentials() {
        if (this.api.sessions.length > 0) {
            return this.api.sessions[0].credentials;
        } else {
            throw Error("Error: there is no session available. Make sure the user is logged in.");
        }
    }

    public getSubscriptionItems() {

        const subscriptionItems: SubscriptionItem[] = [];
        this.api.subscriptions.map(function (subscription) {
            subscriptionItems.push({
                label: subscription.subscription.displayName || '',
                description: subscription.subscription.id || '',
                session: subscription.session,
                subscription: subscription.subscription
            });
        });
        return subscriptionItems;

    }




}
