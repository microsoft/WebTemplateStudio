import { AzureAuth, SubscriptionItem } from './azure-auth/azureAuth';
import { SubscriptionError, ValidationError } from './errors';
import { FunctionProvider } from './azure-functions/functionProvider';
import { CosmosDBDeploy } from './azure-cosmosDB/cosmosDbModule';

export class Controller {
    /**
     * Handles messages from the wizard
     */

    private _azureFunctionProvider: FunctionProvider = new FunctionProvider();
    private _cosmosDBDeploy: CosmosDBDeploy = new CosmosDBDeploy();

    public static getSubscriptions() {
        return AzureAuth.getSubscriptions();
    }

    public static getResourceGroups() {
        throw Error("undefined");
    }

    public static getLocations() {
        throw Error("undefined");
    }

    public async isFunctionAppNameUnique(appName: string, subscriptionLabel: string): Promise<boolean> {
        return this._getSubscriptionItem(subscriptionLabel)
            .then(async (sbscItem) => {
                return this._azureFunctionProvider.checkFunctionAppName(appName, sbscItem)
                    .then((isAvailable) => {
                        if (isAvailable) {
                            return Promise.resolve(true);
                        } else {
                            return Promise.reject(new ValidationError(`Function app name ${appName} is not available`));
                        }
                    })
                    .catch(err => { throw err; });
            })
            .catch(err => { throw err; });
    }

    public async isCosmosResourceNameUnique(appName: string, subscriptionLabel: string): Promise<boolean> {
        return await this._getSubscriptionItem(subscriptionLabel)
            .then(async (sbscItem) => {
                return await this._cosmosDBDeploy.validateCosmosDBAccountName(appName, sbscItem)
                    .then((message) => {
                        if (message === undefined || message === null) {
                            return Promise.resolve(true);
                        } else {
                            return Promise.reject(new ValidationError(message));
                        }
                    })
                    .catch(err => { throw err; });
            })
            .catch(err => { throw err; });
    }

    public deployFunctionApp() {
        throw Error("undefined");
    }

    public deployCosmosResource() {
        throw Error("undefined");
    }

    private async _getSubscriptionItem(subscriptionLabel: string): Promise<SubscriptionItem> {
        return AzureAuth.getSubscriptions().then(items => {
            for (let subscriptionItem of items) {
                if (subscriptionItem.label === subscriptionLabel) {
                    return subscriptionItem;
                }
            }
            throw new SubscriptionError("No subscription found with this name.");
        });
    }
}


