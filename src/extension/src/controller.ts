import * as vscode from "vscode";
import {
  AzureAuth,
  SubscriptionItem,
  ResourceGroupItem
} from "./azure-auth/azureAuth";
import {
  SubscriptionError,
  ValidationError,
  ResourceGroupError
} from "./errors";
import {
  FunctionProvider,
  FunctionSelections
} from "./azure-functions/functionProvider";
import {
  CosmosDBDeploy,
  CosmosDBSelections,
  DatabaseObject
} from "./azure-cosmosDB/cosmosDbModule";
import { ReactPanel } from "./reactPanel";
import ApiModule from "./apiModule";

export abstract class Controller {
  /*
   * Handles messages from the wizard
   */

  private static usersCosmosDBSubscriptionItemCache: SubscriptionItem;
  private static usersFunctionSubscriptionItemCache: SubscriptionItem;
  private static AzureFunctionProvider = new FunctionProvider();
  private static AzureCosmosDBProvider = new CosmosDBDeploy();
  private static reactPanelContext: ReactPanel;

  private static routingMessageReceieverDelegate = function(message: any) {
    switch (message.command) {
      // use information and alert to throw vscode info/alert messages through the wizards
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
              command: "login",
              email: email,
              message: ""
            });
          })
          .catch((err: Error) => {
            Controller.reactPanelContext.postMessageWebview({
              command: "login",
              email: null,
              message: err.message,
              errorType: err.name
            });
          });
        break;

      case "subscriptions":
        AzureAuth.getSubscriptions()
          .then(items => {
            const subs = items;
            Controller.reactPanelContext.postMessageWebview({
              command: "subscriptions",
              subscriptions: subs,
              message: ""
            });
          })
          .catch((err: Error) => {
            Controller.reactPanelContext.postMessageWebview({
              command: "subscriptions",
              subscriptions: null,
              message: err.message,
              errorType: err.name
            });
          });
        break;

      case "name-functions":
        Controller.validateFunctionAppName(
          message.appName,
          message.subscription
        )
          .then(() => {
            Controller.reactPanelContext.postMessageWebview({
              command: "name-functions",
              isAvailable: true,
              message: ""
            });
          })
          .catch((err: Error) => {
            Controller.reactPanelContext.postMessageWebview({
              command: "name-functions",
              isAvailable: false,
              message: err.message,
              errorType: err.name
            });
          });
        break;

      case "name-cosmos":
        Controller.validateCosmosAccountName(
          message.appName,
          message.subscription
        )
          .then(() => {
            Controller.reactPanelContext.postMessageWebview({
              command: "name-cosmos",
              isAvailable: true,
              message: ""
            });
          })
          .catch((err: Error) => {
            Controller.reactPanelContext.postMessageWebview({
              command: "name-cosmos",
              isAvailable: false,
              message: err.message,
              errorType: err.name
            });
          });
        break;

      case "deploy-functions":
        /*
         * example:
         *   {
         *       command: 'deploy-functions'
         *       appPath: 'C:\Users\t-dadua\Documents'
         *       selections: {
         *           appName: "YOUR_FUNCTION_APP_NAME",
         *           subscription: "YOUR_SUBSCRIPTION_LABEL",
         *           location: "West US",
         *           runtime: "node",
         *           resourceGroup: "YOUR_RESOURCE_GROUP",
         *           functionNames: ["function1", "function2", "function3"]
         *       }
         *   }
         */
        Controller.deployFunctionApp(message.selections, message.appPath)
          .then(() => {
            Controller.reactPanelContext.postMessageWebview({
              command: "deploy-functions",
              succeeded: true,
              message: ""
            });
          })
          .catch((err: Error) => {
            Controller.reactPanelContext.postMessageWebview({
              command: "deploy-functions",
              succeeded: false,
              message: err.message,
              errorType: err.name
            });
          });
        break;

      case "deploy-cosmos":
        /*
         * example:
         *   {
         *       command: 'deploy-cosmos'
         *       selections: {
         *           api: "MongoDB",
         *           accountName: "YOUR_ACCOUNT_NAME",
         *           location: "West US",
         *           subscription: "YOUR_SUBSCRIPTION_LABEL",
         *           resourceGroup: "YOUR_RESOURCE_GROUP"
         *       }
         *   }
         */
        Controller.deployCosmosResource(message.selections)
          .then((dbObject: DatabaseObject) => {
            Controller.reactPanelContext.postMessageWebview({
              command: "deploy-cosmos",
              databaseObject: dbObject,
              message: ""
            });
          })
          .catch((err: Error) => {
            Controller.reactPanelContext.postMessageWebview({
              command: "deploy-cosmos",
              databaseObject: null,
              message: err.message,
              errorType: err.name
            });
          });
        break;

      case "generate":
        // FIXME: After gen is done, we need to do some feedback.
        ApiModule.SendGeneration("5000", message.payload);
        break;
    }
  };

  public static launchWizard(context: vscode.ExtensionContext) {
    Controller.reactPanelContext = ReactPanel.createOrShow(
      context.extensionPath,
      this.routingMessageReceieverDelegate
    );
  }

  public static getSubscriptions() {
    return AzureAuth.getSubscriptions();
  }

  public static async getResourceGroups(subscriptionLabel: string) {
    let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
    return AzureAuth.getResourceGroupItems(subscriptionItem);
  }

  public static async validateFunctionAppName(
    functionAppName: string,
    subscriptionLabel: string
  ): Promise<void> {
    await this.updateFunctionSubscriptionItemCache(subscriptionLabel);

    return this.AzureFunctionProvider.checkFunctionAppName(
      functionAppName,
      this.usersFunctionSubscriptionItemCache
    )
      .then(isAvailable => {
        if (isAvailable) {
          return Promise.resolve();
        } else {
          return Promise.reject(
            new ValidationError(
              `Function app name ${functionAppName} is not available`
            )
          );
        }
      })
      .catch(err => {
        throw err;
      });
  }

  public static async validateCosmosAccountName(
    cosmosDBAccountName: string,
    subscriptionLabel: string
  ): Promise<void> {
    await this.updateCosmosDBSubscriptionItemCache(subscriptionLabel);

    return this.AzureCosmosDBProvider.validateCosmosDBAccountName(
      cosmosDBAccountName,
      this.usersCosmosDBSubscriptionItemCache
    )
      .then(message => {
        if (message === undefined || message === null || message === "") {
          return Promise.resolve();
        } else {
          return Promise.reject(new ValidationError(message));
        }
      })
      .catch(err => {
        throw err;
      });
  }

  public static async deployFunctionApp(
    selections: any,
    appPath: string
  ): Promise<void> {
    await this.updateFunctionSubscriptionItemCache(selections.subscription);

    let userFunctionsSelections: FunctionSelections = {
      functionAppName: selections.appName,
      subscriptionItem: Controller.usersFunctionSubscriptionItemCache,
      resourceGroupItem: await this._getResourceGroupItem(
        selections.resourceGroup,
        Controller.usersFunctionSubscriptionItemCache
      ),
      location: selections.location,
      runtime: selections.runtime,
      functionNames: selections.functionNames
    };

    let functionProvider = new FunctionProvider();

    return await functionProvider.createFunctionApp(
      userFunctionsSelections,
      appPath
    );
  }

  public static async deployCosmosResource(
    selections: any
  ): Promise<DatabaseObject> {
    try {
      await Controller.validateCosmosAccountName(
        selections.accountName,
        selections.subscription
      );
    } catch (err) {
      return Promise.reject(err);
    }

    let userCosmosDBSelection: CosmosDBSelections = {
      cosmosAPI: selections.api,
      cosmosDBResourceName: selections.accountName,
      location: selections.location,
      resourceGroupItem: await this._getResourceGroupItem(
        selections.resourceGroup,
        Controller.usersCosmosDBSubscriptionItemCache
      ),
      subscriptionItem: Controller.usersCosmosDBSubscriptionItemCache,
      tags: { "Created from": "Web Template Studio" }
    };

    return await this.AzureCosmosDBProvider.createCosmosDB(
      userCosmosDBSelection
    );
  }

  private static async _getResourceGroupItem(
    resourceName: string,
    subscriptionItem: SubscriptionItem
  ): Promise<ResourceGroupItem> {
    return AzureAuth.getResourceGroupItems(subscriptionItem).then(items => {
      for (let resourceGroup of items) {
        if (resourceGroup.name === resourceName) {
          return resourceGroup;
        }
      }
      throw new ResourceGroupError("No resource group found with this name");
    });
  }

  private static async _getSubscriptionItem(
    subscriptionLabel: string
  ): Promise<SubscriptionItem> {
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
  private static async updateCosmosDBSubscriptionItemCache(
    subscriptionLabel: string
  ): Promise<void> {
    if (this.usersCosmosDBSubscriptionItemCache === undefined) {
      let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
      this.usersCosmosDBSubscriptionItemCache = subscriptionItem;
    } else if (
      subscriptionLabel !== this.usersCosmosDBSubscriptionItemCache.label
    ) {
      let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
      this.usersCosmosDBSubscriptionItemCache = subscriptionItem;
    }
  }
  private static async updateFunctionSubscriptionItemCache(
    subscriptionLabel: string
  ): Promise<void> {
    if (this.usersFunctionSubscriptionItemCache === undefined) {
      let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
      this.usersFunctionSubscriptionItemCache = subscriptionItem;
    } else if (
      subscriptionLabel !== this.usersFunctionSubscriptionItemCache.label
    ) {
      let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
      this.usersFunctionSubscriptionItemCache = subscriptionItem;
    }
  }
}
