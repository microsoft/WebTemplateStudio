import { AzureAuth } from './azure-auth/azureAuth';
import { SubscriptionError } from './errors';
export abstract class Controller {
    /**
     * Handles messages from the wizard
     *
     * */
    public static getSubscriptions() {
        return AzureAuth.getSubscriptions();
    }

    public static getResourceGroups(subscriptionLabel: string) {
        this.getSubscriptions().then(items => {
            items.forEach(subscriptionItem => {
                if (subscriptionItem.label === subscriptionLabel) {
                    return AzureAuth.getResourceGroupItems(subscriptionItem);
                }
            });
            throw new SubscriptionError("Subscription label " + subscriptionLabel + " not found");
        });
    }

    public static getLocations() {
        throw Error("Undefined");
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






}