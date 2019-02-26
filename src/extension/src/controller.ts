import * as vscode from "vscode";
import { AzureAuth, SubscriptionItem } from './azure-auth/azureAuth';
import { SubscriptionError, ValidationError } from './errors';
import { FunctionProvider, FunctionSelections } from './azure-functions/functionProvider';
import { CosmosDBDeploy, CosmosDBSelections } from './azure-cosmosDB/cosmosDbModule';
import {ReactPanel}  from './reactPanel';
export abstract class Controller {

    private static usersCosmosDBSubscriptionItemCache : SubscriptionItem;
    private static usersFunctionSubscriptionItemCache : SubscriptionItem;
    private static AzureFunctionProvider = new FunctionProvider(); 
    private static AzureCosmosDBProvider = new CosmosDBDeploy();
    private static reactPanelContext : ReactPanel;
    private static routingMessageReceieverDelegate =     
        function (message: any) {
        switch (message.command) {
            case "alert":
            vscode.window.showErrorMessage(message.text);
            // Controller.isCosmosResourceNameUnique();

            return;
            case "login":
            AzureAuth.login().then(res => {
                const email = AzureAuth.getEmail();
                Controller.reactPanelContext.postMessageWebview({
                command: 'login',
                email: email
                });
            }).catch(err => {
                console.log(err);
            });
            case "subscriptions":
            AzureAuth.getSubscriptions().then(items => {
                const subs = items;
                Controller.reactPanelContext.postMessageWebview({
                command: 'subscriptions',
                subscriptions: subs
                // resources: {label:Giv.Hackathon value: Giv.Hackathon}[]
                });
            });
        }
    }
  ;



    /**
     * launchWizard
     */
    public static launchWizard(context: vscode.ExtensionContext) {
        Controller.reactPanelContext = ReactPanel.createOrShow(context.extensionPath, this.routingMessageReceieverDelegate);
    }

    /**
     * Handles messages from the wizard
     *
     * */
    public static getSubscriptions() {
        return AzureAuth.getSubscriptions();
    }

    public static async getResourceGroups(subscriptionLabel : string) {
        let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
        return AzureAuth.getResourceGroupItems(subscriptionItem);
    }

    public static async getLocations(subscriptionLabel : string) {
        // let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
        // return AzureAuth.getLocations(subscriptionItem);
        
        throw Error("unimplemented");
    }

    public static async isFunctionAppNameUnique(functionAppName : string, subscriptionLabel : string) : Promise<boolean> {
        this.updateFunctionSubscriptionItemCache(subscriptionLabel);

        return this.AzureFunctionProvider.checkFunctionAppName(functionAppName, this.usersFunctionSubscriptionItemCache)
        .then((isAvailable) => {
            if (isAvailable) {
                return Promise.resolve(true);
            } else {
                return Promise.reject(new ValidationError(`Function app name ${functionAppName} is not available`));
            }
        })
        .catch(err => { throw err; });;
    }

    public static async isCosmosResourceNameUnique(cosmosDBAccountName : string, subscriptionLabel : string) : Promise<boolean> {
        await this.updateCosmosDBSubscriptionItemCache(subscriptionLabel);

        return this.AzureCosmosDBProvider.validateCosmosDBAccountName(cosmosDBAccountName, this.usersCosmosDBSubscriptionItemCache)
        .then((message) => {
            if (message === undefined || message === null || message === "") {
                return Promise.resolve(true);
            } else {
                return Promise.reject(new ValidationError(message));
            }
        })
        .catch(err => { throw err; });
    }

    public static deployFunctionApp() {
        throw Error("undefined");
    }

    public static deployCosmosResource() {
        throw Error("undefined");
    }

    private static async _getSubscriptionItem(subscriptionLabel: string): Promise<SubscriptionItem> {
        return AzureAuth.getSubscriptions().then(items => {
            items.forEach(subscriptionItem => {
                if (subscriptionItem.label === subscriptionLabel) {
                    return Promise.resolve(subscriptionItem);
                }
            });
            throw new SubscriptionError("No subscription found with this name.");
        });
    }

    /*
    *
    * Caching is used for performance; when displaying live check on keystroke to wizard
    * 
    */
    private static async updateCosmosDBSubscriptionItemCache(subscriptionLabel : string): Promise<void> {
        if(this.usersCosmosDBSubscriptionItemCache === undefined){
            let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
            this.usersCosmosDBSubscriptionItemCache = subscriptionItem;
        }
        else if (subscriptionLabel !== this.usersCosmosDBSubscriptionItemCache.label){
            let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
            this.usersCosmosDBSubscriptionItemCache = subscriptionItem;
        }
    }
    private static async updateFunctionSubscriptionItemCache(subscriptionLabel : string): Promise<void> {
        if(this.usersFunctionSubscriptionItemCache === undefined){
            let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
            this.usersFunctionSubscriptionItemCache = subscriptionItem;
        }
        else if (subscriptionLabel !== this.usersFunctionSubscriptionItemCache.label){
            let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
            this.usersFunctionSubscriptionItemCache = subscriptionItem;
        }
    } 
}


