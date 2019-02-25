import { AzureAuth, SubscriptionItem } from './azure-auth/azureAuth';
import { SubscriptionError } from './errors';
export abstract class Controller {
    /**
     * Handles messages from the wizard
     *
     * */
    public static getSubscriptions() {
        return AzureAuth.getSubscriptions();
    }

    public static getResourceGroups() {
        throw Error("undefined");
    }

    public static getLocations() {
        throw Error("undefined");
    }

    public static isFunctionAppNameUnique() {
        throw Error("undefined");
    }

    public static isCosmosResourceNameUnique() {
        throw Error("undefined");
    }

    public static deployFunctionApp() {
        throw Error("undefined");
    }

    public static deployCosmosResource() {
        throw Error("undefined");
    }

    private static async_getSubscriptionItem(subscriptionLabel: string): Promise<SubscriptionItem> {
        return AzureAuth.getSubscriptions().then(items => {
            items.forEach(subscriptionItem => {
                if (subscriptionItem.label === subscriptionLabel) {
                    return Promise.resolve(subscriptionItem);
                }
            });
            throw new SubscriptionError("No subscription found with this name.");
        });
    }
}


