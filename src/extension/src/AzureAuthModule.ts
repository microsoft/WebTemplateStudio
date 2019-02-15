import { ExtensionContext, commands, extensions } from 'vscode';
import { AzureAccount, AzureSession } from './azure-account.api'; // Other extensions need to copy this .d.ts to their repository.
import { SubscriptionClient, ResourceManagementClient, SubscriptionModels } from 'azure-arm-resource';

export interface SubscriptionItem {
    label: string;
    description: string;
    session: AzureSession;
    subscription: SubscriptionModels.Subscription;
}

export interface PartialList<T> extends Array<T> {
    nextLink?: string;
}

export class AzureAuth {

    context: ExtensionContext;
    api: AzureAccount;
    private _subscriptionItems: SubscriptionItem[] = [];
    constructor(context: ExtensionContext) {
        this.api = extensions.getExtension<AzureAccount>('ms-vscode.azure-account')!.exports;
        //const subscriptions = context.subscriptions;
        this.context = context;
    }

    public getCredentials() {
        if (this.api.sessions.length > 0) {
            return this.api.sessions[0].credentials;
        } else {
            throw Error("Error: there is no session available. Make sure the user is logged in.");
        }
    }

    public getResourceGroupItems(subscriptionItem: SubscriptionItem) {

        var referenceObject = { resourceGroup: [] };
        this._loadResourceGroupItems(subscriptionItem, referenceObject);
        return referenceObject.resourceGroup;

    }

    public getSubscriptionItems() {

        const subscriptionItems: SubscriptionItem[] = [];
        this.api.subscriptions.map(function (subscription) {
            subscriptionItems.push({
                label: subscription.subscription.displayName || '',
                description: subscription.subscription.id || '',
                session: subscription.session,
                subscription: subscription.subscription
            })
        });
        return subscriptionItems;

    }

    private async _loadResourceGroupItems(subscriptionItem: SubscriptionItem, resourceGroupObj: {}) {
        const { session, subscription } = subscriptionItem;
        const resources = new ResourceManagementClient(session.credentials, subscription.subscriptionId!);
        const resourceGroups = await this._listAll(resources.resourceGroups, resources.resourceGroups.list());
        resourceGroups.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        return resourceGroups.map(resourceGroup => ({
            label: resourceGroup.name || '',
            description: resourceGroup.location,
            resourceGroup
        }));
    }

    private _loadSubscriptions(api: AzureAccount) {

        if (this.api.status !== "LoggedIn") {
            throw Error("User not logged in.");
        }
        this._loadSubscriptionItems(api);

    }

    private async _loadSubscriptionItems(api: AzureAccount) {

        const subscriptionItems: SubscriptionItem[] = [];
        for (const session of api.sessions) {
            const credentials = session.credentials;
            const subscriptionClient = new SubscriptionClient(credentials);
            var subscriptions;
            this._listAll(subscriptionClient.subscriptions, subscriptionClient.subscriptions.list()).then(data => subscriptions = data);
            subscriptionItems.push(...subscriptions.map(subscription => ({
                label: subscription.displayName || '',
                description: subscription.subscriptionId || '',
                session,
                subscription
            })));
        }
        subscriptionItems.sort((a, b) => a.label.localeCompare(b.label));
        this._subscriptionItems = subscriptionItems;
        return subscriptionItems;
    }

    private async _listAll<T>(client: { listNext(nextPageLink: string): Promise<PartialList<T>>; }, first: Promise<PartialList<T>>): Promise<T[]> {
        const all: T[] = [];
        for (let list = await first; list.length || list.nextLink; list = list.nextLink ? await client.listNext(list.nextLink) : []) {
            all.push(...list);
        }
        return all;
    }


}
