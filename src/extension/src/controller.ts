import * as vscode from "vscode";
import { AzureAuth, SubscriptionItem } from './azure-auth/azureAuth';
import { SubscriptionError, ValidationError } from './errors';
import { FunctionProvider } from './azure-functions/functionProvider';
import { CosmosDBDeploy, DatabaseObject } from './azure-cosmosDB/cosmosDbModule';
import { ReactPanel } from './reactPanel';

export abstract class Controller {
    /*
    * Handles messages from the wizard
    */

    private static usersCosmosDBSubscriptionItemCache: SubscriptionItem;
    private static usersFunctionSubscriptionItemCache: SubscriptionItem;
    private static AzureFunctionProvider = new FunctionProvider();
    private static AzureCosmosDBProvider = new CosmosDBDeploy();
    private static reactPanelContext: ReactPanel;

    private static routingMessageReceieverDelegate =
        function (message: any) {
            switch (message.command) {
                case "information":
                    vscode.window.showInformationMessage(message.text);
                    break;

                case "alert":
                    vscode.window.showErrorMessage(message.text);
                    break;

                case "login":
                    AzureAuth.login()
                        .then(res => {
                            const email = AzureAuth.getEmail();
                            Controller.reactPanelContext.postMessageWebview({
                                command: 'login',
                                email: email,
                                message: ""
                            });
                        })
                        .catch((err: Error) => {
                            Controller.reactPanelContext.postMessageWebview({
                                command: 'login',
                                email: null,
                                message: err.message
                            });
                        });
                    break;

                case "subscriptions":
                    AzureAuth.getSubscriptions()
                        .then(items => {
                            const subs = items;
                            Controller.reactPanelContext.postMessageWebview({
                                command: 'subscriptions',
                                subscriptions: subs,
                                message: ""
                            });
                        })
                        .catch((err: Error) => {
                            Controller.reactPanelContext.postMessageWebview({
                                command: 'subscriptions',
                                subscriptions: null,
                                message: err.message
                            });
                        });;
                    break;

                case "name-functions":
                    Controller.isFunctionAppNameUnique(message.appName, message.subscriptionLabel)
                        .then(() => {
                            Controller.reactPanelContext.postMessageWebview({
                                command: 'name-functions-result',
                                isAvailable: true,
                                message: ""
                            });
                        })
                        .catch((err: Error) => {
                            Controller.reactPanelContext.postMessageWebview({
                                command: 'name-functions-result',
                                isAvailable: false,
                                message: err.message
                            });
                        });
                    break;

                case "name-cosmos":
                    Controller.isCosmosResourceNameUnique(message.appName, message.subscriptionLabel)
                        .then(() => {
                            Controller.reactPanelContext.postMessageWebview({
                                command: 'name-cosmos-result',
                                isAvailable: true,
                                message: ""
                            });
                        })
                        .catch((err: Error) => {
                            Controller.reactPanelContext.postMessageWebview({
                                command: 'name-cosmos-result',
                                isAvailable: false,
                                message: err.message
                            });
                        });
                    break;

                case "deploy-functions":
                    Controller.deployFunctionApp(message.selections)
                        .then(() => {
                            Controller.reactPanelContext.postMessageWebview({
                                command: 'deploy-functions-result',
                                deploymentSucceeded: true,
                                message: ""
                            });
                        })
                        .catch((err: Error) => {
                            Controller.reactPanelContext.postMessageWebview({
                                command: 'deploy-functions-result',
                                deploymentSucceeded: false,
                                message: err.message
                            });
                        });
                    break;

                case "deploy-cosmos":
                    Controller.deployCosmosResource(message.selections)
                        .then((dbObject: DatabaseObject) => {
                            Controller.reactPanelContext.postMessageWebview({
                                command: 'deploy-cosmos-result',
                                databaseObject: dbObject,
                                message: ""
                            });
                        })
                        .catch((err: Error) => {
                            Controller.reactPanelContext.postMessageWebview({
                                command: 'deploy-cosmos-result',
                                databaseObject: null,
                                message: err.message
                            });
                        });
                    break;

                case "getOutputPath":
                    vscode.window.showOpenDialog({
                        canSelectFiles: false,
                        canSelectFolders: true,
                        canSelectMany: false
                    }).then((res) => {
                        if (res !== undefined) {
                            Controller.reactPanelContext.postMessageWebview({
                                command: "getOutputPath",
                                outputPath: res[0].path
                            });
                        } else {
                            Controller.reactPanelContext.postMessageWebview({
                                command: "getOutputPath",
                                outputPath: undefined
                            });
                        };
                    });
                    break;
            }
        }
        ;


    public static launchWizard(context: vscode.ExtensionContext) {
        Controller.reactPanelContext = ReactPanel.createOrShow(context.extensionPath, this.routingMessageReceieverDelegate);
    }

    public static getSubscriptions() {
        return AzureAuth.getSubscriptions();
    }

    public static async getResourceGroups(subscriptionLabel: string) {
        let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
        return AzureAuth.getResourceGroupItems(subscriptionItem);
    }

    public static async isFunctionAppNameUnique(functionAppName: string, subscriptionLabel: string): Promise<void> {
        await this.updateFunctionSubscriptionItemCache(subscriptionLabel);

        return this.AzureFunctionProvider.checkFunctionAppName(functionAppName, this.usersFunctionSubscriptionItemCache)
            .then((isAvailable) => {
                if (isAvailable) {
                    return Promise.resolve();
                } else {
                    return Promise.reject(new ValidationError(`Function app name ${functionAppName} is not available`));
                }
            })
            .catch(err => { throw err; });
    }

    public static async isCosmosResourceNameUnique(cosmosDBAccountName: string, subscriptionLabel: string): Promise<void> {
        await this.updateCosmosDBSubscriptionItemCache(subscriptionLabel);

        return this.AzureCosmosDBProvider.validateCosmosDBAccountName(cosmosDBAccountName, this.usersCosmosDBSubscriptionItemCache)
            .then((message) => {
                if (message === undefined || message === null || message === "") {
                    return Promise.resolve();
                } else {
                    return Promise.reject(new ValidationError(message));
                }
            })
            .catch(err => { throw err; });
    }

    public static async deployFunctionApp(selections: any): Promise<void> {
        throw Error("undefined");
    }

    public static async deployCosmosResource(selections: any): Promise<DatabaseObject> {
        throw Error("undefined");
    }

    private static async _getSubscriptionItem(subscriptionLabel: string): Promise<SubscriptionItem> {
        return AzureAuth.getSubscriptions().then(items => {
            for (let subscriptionItem of items) {
                if (subscriptionItem.label === subscriptionLabel) {
                    return subscriptionItem;
                }
            }
            throw new SubscriptionError("No subscription found with this name.");
        });
    }

    /*
    * Caching is used for performance; when displaying live check on keystroke to wizard
    */
    private static async updateCosmosDBSubscriptionItemCache(subscriptionLabel: string): Promise<void> {
        if (this.usersCosmosDBSubscriptionItemCache === undefined) {
            let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
            this.usersCosmosDBSubscriptionItemCache = subscriptionItem;
        }
        else if (subscriptionLabel !== this.usersCosmosDBSubscriptionItemCache.label) {
            let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
            this.usersCosmosDBSubscriptionItemCache = subscriptionItem;
        }
    }
    private static async updateFunctionSubscriptionItemCache(subscriptionLabel: string): Promise<void> {
        if (this.usersFunctionSubscriptionItemCache === undefined) {
            let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
            this.usersFunctionSubscriptionItemCache = subscriptionItem;
        }
        else if (subscriptionLabel !== this.usersFunctionSubscriptionItemCache.label) {
            let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
            this.usersFunctionSubscriptionItemCache = subscriptionItem;
        }
    }
}


