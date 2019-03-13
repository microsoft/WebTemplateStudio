import * as vscode from "vscode";
import { CONSTANTS, ExtensionCommand } from "./constants";
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
  private static usersCosmosDBSubscriptionItemCache: SubscriptionItem;
  private static usersFunctionSubscriptionItemCache: SubscriptionItem;
  private static AzureFunctionProvider = new FunctionProvider();
  private static AzureCosmosDBProvider = new CosmosDBDeploy();
  private static reactPanelContext: ReactPanel;
  private static commandMap: Map<
    ExtensionCommand,
    (message: any) => void
  > = new Map([
    [ExtensionCommand.Login, Controller.performLogin],
    [ExtensionCommand.Subscriptions, Controller.sendSubscriptionsToClient],
    [
      ExtensionCommand.SubscriptionData,
      Controller.sendSubscriptionDataToClient
    ],
    [
      ExtensionCommand.NameFunctions,
      Controller.sendFunctionNameValidationStatusToClient
    ],
    [
      ExtensionCommand.NameCosmos,
      Controller.sendCosmosNameValidationStatusToClient
    ],
    [ExtensionCommand.Generate, Controller.handleGeneratePayloadFromClient],
    [ExtensionCommand.GetOutputPath, Controller.sendOutputPathSelectionToClient]
  ]);

  private static routingMessageReceieverDelegate = function (message: any) {
    let command = Controller.commandMap.get(message.command);

    if (command) {
      command(message);
    } else {
      vscode.window.showErrorMessage(CONSTANTS.ERRORS.INVALID_COMMAND);
    }
  };

  /**
   * launchWizard
   * Will pass in a routing function delegate to the ReactPanel
   *  @param VSCode context interface
   */
  public static launchWizard(context: vscode.ExtensionContext) {
    Controller.reactPanelContext = ReactPanel.createOrShow(
      context.extensionPath,
      this.routingMessageReceieverDelegate
    );
  }

  /**
   * Returns an array of Subscription Items when the user is logged in
   *
   * */
  public static getSubscriptions() {
    //TODO FORMAT TO {label:,  value:}
    return AzureAuth.getSubscriptions();
  }

  /**
   * @param String subscription label
   * @returns a Json object of Formatted Resource and Location strings
   *
   * */
  public static async getSubscriptionData(subscriptionLabel: string) {
    let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
    let resourceGroupItems = this.getResourceGroups(subscriptionItem).then(
      resourceGroups => {
        // Format
        let formatResourceGroupList = [];
        formatResourceGroupList.push(
          ...resourceGroups.map(resourceGroup => {
            return {
              label: resourceGroup.name,
              value: resourceGroup.name
            };
          })
        );
        return formatResourceGroupList;
      }
    );
    let locationItems = this.getLocations(subscriptionItem).then(locations => {
      // Format
      let formatLocationList = [];
      formatLocationList.push(
        ...locations.map(location => {
          return {
            label: location.locationDisplayName,
            value: location.locationDisplayName
          };
        })
      );
      return formatLocationList;
    });

    // Parallel setup
    return {
      resourceGroups: await resourceGroupItems,
      locations: await locationItems
    };
  }
  /**
   * @param SubscriptionItem subscription item interface implementation
   * @returns a list of Resource Group Items
   *
   * */
  private static async getResourceGroups(subscriptionItem: SubscriptionItem) {
    return AzureAuth.getResourceGroupItems(subscriptionItem);
  }
  /**
   * @param SubscriptionItem subscription item interface implementation
   * @returns a list of Location Items
   *
   * */
  private static async getLocations(subscriptionItem: SubscriptionItem) {
    return AzureAuth.getLocations(subscriptionItem);
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
              CONSTANTS.ERRORS.FUNCTION_APP_NAME_NOT_AVAILABLE(functionAppName)
            )
          );
        }
      })
      .catch(err => {
        throw err;
      });
  }

  public static performLogin(message: any) {
    AzureAuth.login()
      .then(res => {
        const email = AzureAuth.getEmail();
        AzureAuth.getSubscriptions()
          .then(items => {
            const subscriptions = items.map(subscriptionItem => {
              return {
                label: subscriptionItem.label,
                value: subscriptionItem.label
              };
            });
            Controller.handleValidMessage(ExtensionCommand.Login, {
              email: email,
              subscriptions: subscriptions
            });
          })
          .catch((err: Error) => {
            Controller.handleErrorMessage(ExtensionCommand.Login, err);
          });
      })
      .catch(err => {
        vscode.window.showErrorMessage(err);
      });
  }

  public static sendSubscriptionsToClient(message: any) {
    Controller.getSubscriptions()
      .then(subscriptions => {
        Controller.handleValidMessage(ExtensionCommand.Subscriptions, {
          subscriptions: subscriptions
        });
      })
      .catch((err: Error) => {
        Controller.handleErrorMessage(ExtensionCommand.Subscriptions, err);
      });
  }

  public static sendSubscriptionDataToClient(message: any) {
    Controller.getSubscriptionData(message.subscription)
      .then(subscriptionDatapackage => {
        Controller.handleValidMessage(ExtensionCommand.SubscriptionData, {
          resourceGroups: subscriptionDatapackage.resourceGroups,
          locations: subscriptionDatapackage.locations
        });
      })
      .catch((err: Error) => {
        Controller.handleErrorMessage(ExtensionCommand.SubscriptionData, err);
      });
  }

  public static sendFunctionNameValidationStatusToClient(message: any) {
    Controller.validateFunctionAppName(message.appName, message.subscription)
      .then(() => {
        Controller.handleValidMessage(ExtensionCommand.NameFunctions, {
          isAvailable: true
        });
      })
      .catch((err: Error) => {
        Controller.handleErrorMessage(ExtensionCommand.NameFunctions, err, {
          isAvailable: false
        });
      });
  }

  public static sendCosmosNameValidationStatusToClient(message: any) {
    Controller.validateCosmosAccountName(message.appName, message.subscription)
      .then(() => {
        Controller.handleValidMessage(ExtensionCommand.NameCosmos, {
          isAvailable: true
        });
      })
      .catch((err: Error) => {
        Controller.handleErrorMessage(ExtensionCommand.NameCosmos, err, {
          isAvailable: false
        });
      });
  }

  public static async handleGeneratePayloadFromClient(
    message: any
  ): Promise<any> {
    var payload = message.payload;
    var enginePayload: any = payload.engine;
    await Controller.sendTemplateGenInfoToApiAndSendStatusToClient(
      enginePayload
    );

    if (payload.selectedCosmos) {
      var cosmosPayload: any = payload.cosmos;
      await Controller.attemptCosmosDeploymentAndSendStatusToClient(
        cosmosPayload
      );
    }
  }

  public static attemptFunctionDeploymentAndSendStatusToClient(message: any) {
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
        Controller.handleValidMessage(ExtensionCommand.DeployFunctions, {
          succeeded: true
        });
      })
      .catch((err: Error) => {
        Controller.handleErrorMessage(ExtensionCommand.DeployFunctions, err, {
          succeeded: false
        });
      });
  }

  public static attemptCosmosDeploymentAndSendStatusToClient(
    cosmosPayload: any
  ) {
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
    Controller.deployCosmosResource(cosmosPayload)
      .then((dbObject: DatabaseObject) => {
        Controller.handleValidMessage(ExtensionCommand.DeployCosmos, {
          databaseObject: dbObject
        });

        vscode.window.showInformationMessage(
          CONSTANTS.INFO.COSMOS_ACCOUNT_DEPLOYED(cosmosPayload.accountName)
        );
      })
      .catch((err: Error) => {
        vscode.window.showErrorMessage(err.message);
        Controller.handleErrorMessage(ExtensionCommand.DeployCosmos, err);
      });
  }

  public static sendTemplateGenInfoToApiAndSendStatusToClient(
    enginePayload: any
  ) {
    // FIXME: After gen is done, we need to do some feedback.
    ApiModule.SendTemplateGenerationPayloadToApi("5000", enginePayload);
  }

  public static sendOutputPathSelectionToClient(message: any) {
    vscode.window
      .showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false
      })
      .then(res => {
        let path = undefined;

        if (res !== undefined) {
          path = res[0].path;
        }

        Controller.handleValidMessage(ExtensionCommand.GetOutputPath, {
          outputPath: path
        });
      });
  }

  public static handleValidMessage(command: ExtensionCommand, payload?: any) {
    Controller.reactPanelContext.postMessageWebview({
      command: command,
      payload: payload,
      message: ""
    });
  }

  public static handleErrorMessage(
    command: ExtensionCommand,
    error: Error,
    payload?: any
  ) {
    Controller.reactPanelContext.postMessageWebview({
      command: command,
      payload: payload,
      message: error.message,
      errorType: error.name
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
      throw new ResourceGroupError(CONSTANTS.ERRORS.RESOURCE_GROUP_NOT_FOUND);
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
      throw new SubscriptionError(CONSTANTS.ERRORS.SUBSCRIPTION_NOT_FOUND);
    });
  }

  /*
   * Caching is used for performance; when displaying live check on keystroke to wizard
   */
  private static async updateCosmosDBSubscriptionItemCache(
    subscriptionLabel: string
  ): Promise<void> {
    if (
      this.usersCosmosDBSubscriptionItemCache === undefined ||
      subscriptionLabel !== this.usersCosmosDBSubscriptionItemCache.label
    ) {
      let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
      this.usersCosmosDBSubscriptionItemCache = subscriptionItem;
    }
  }

  private static async updateFunctionSubscriptionItemCache(
    subscriptionLabel: string
  ): Promise<void> {
    if (
      this.usersFunctionSubscriptionItemCache === undefined ||
      subscriptionLabel !== this.usersFunctionSubscriptionItemCache.label
    ) {
      let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
      this.usersFunctionSubscriptionItemCache = subscriptionItem;
    }
  }
}
