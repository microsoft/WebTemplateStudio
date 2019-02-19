import { AzureAccount, AzureSession } from './azure-account.api'; // Other extensions need to copy this .d.ts to their repository.
import { extensions, commands } from 'vscode';
import { SubscriptionClient, ResourceManagementClient, SubscriptionModels } from 'azure-arm-resource';
import { ServiceClientCredentials } from 'ms-rest';

export interface SubscriptionItem {
    label: string;
    subscriptionId: string;
    session: AzureSession;
    subscription: SubscriptionModels.Subscription;
}

export interface ResourceGroupItem {
    name: string;
    location: string;
    resourceGroup: {};
}

interface PartialList<T> extends Array<T> {
    nextLink?: string;
}

export abstract class AzureAuth {

    private static api: AzureAccount;

    private static async initialize() {
        /**
         * Initializes the AzureAccount object if not initialized.
         * Will get called whenever a function that uses AzureAccount object is called
         * TODO: Force user to login if not logged in, currently breaks
         */
        if (this.api === null) {
            this.api = extensions.getExtension<AzureAccount>('ms-vscode.azure-account')!.exports;
            if (!(await this.api.waitForLogin)) {
                commands.executeCommand("azure-account.askForLogin");
            }
        }
    }

    public static getCredentials(): ServiceClientCredentials {
        this.initialize();
        if (this.api.sessions.length > 0) {
            return this.api.sessions[0].credentials;
        } else {
            commands.executeCommand("azure-account.login");
            throw Error("Error: there is no session available. Make sure the user is logged in.");
        }
    }

    public static async getSubscriptions(): Promise<SubscriptionItem[]> {
        this.initialize();
        this.api = extensions.getExtension<AzureAccount>('ms-vscode.azure-account')!.exports;
        const subscriptionItems = this.loadSubscriptionItems();
        return subscriptionItems;
    }

    private static async loadSubscriptionItems(): Promise<SubscriptionItem[]> {
        await this.api.waitForFilters();
        const subscriptionItems: SubscriptionItem[] = [];
        for (const session of this.api.sessions) {
            const credentials = session.credentials;
            const subscriptionClient = new SubscriptionClient(credentials);
            const subscriptions = await this.listAll(subscriptionClient.subscriptions, subscriptionClient.subscriptions.list());
            subscriptionItems.push(...subscriptions.map(subscription => ({
                label: subscription.displayName || '',
                subscriptionId: subscription.subscriptionId || '',
                session,
                subscription
            })));
        }
        subscriptionItems.sort((a, b) => a.label.localeCompare(b.label));
        return subscriptionItems;
    }

    public static async getResourceGroupItems(subscriptionItem: SubscriptionItem): Promise<ResourceGroupItem[]> {
        this.initialize();
        const { session, subscription } = subscriptionItem;
        const resourceGroupItems: ResourceGroupItem[] = [];
        const resources = new ResourceManagementClient(session.credentials, subscription.subscriptionId!);
        const resourceGroups = await this.listAll(resources.resourceGroups, resources.resourceGroups.list());
        resourceGroups.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        resourceGroupItems.push(...resourceGroups.map(resourceGroup => {
            return {
                name: resourceGroup.name,
                location: resourceGroup.location,
                resourceGroup: resourceGroup
            };
        }));
        return resourceGroupItems;
    }

    private static async listAll<T>(client: { listNext(nextPageLink: string): Promise<PartialList<T>>; }, first: Promise<PartialList<T>>): Promise<T[]> {
        const all: T[] = [];
        for (let list = await first; list.length || list.nextLink; list = list.nextLink ? await client.listNext(list.nextLink) : []) {
            all.push(...list);
        }
        return all;
    }




}
