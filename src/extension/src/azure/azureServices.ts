import * as vscode from 'vscode';
import {
  AzureAuth,
  SubscriptionItem,
  ResourceGroupItem,
  LocationItem
} from "./azure-auth/azureAuth";
import {
  CosmosDBDeploy,
  CosmosDBSelections,
  DatabaseObject,
  GetAvailableAPIs
} from "./azure-cosmosDB/cosmosDbModule";
import {
  FunctionProvider,
  FunctionSelections,
  GetAvailableRuntimes
} from "./azure-functions/functionProvider";
import {
  CONSTANTS,
  ExtensionCommand,
  TelemetryEventName,
  SyncStatus,
  AzureResourceType,
  DialogMessages,
  DialogResponses
} from "../constants";
import { SubscriptionError, ValidationError } from "../errors";

export abstract class AzureServices {
  private static AzureFunctionProvider = new FunctionProvider();
  private static AzureCosmosDBProvider = new CosmosDBDeploy();

  private static userEmail: string;
  private static subscriptionItemList: SubscriptionItem[] = [];

  private static usersCosmosDBSubscriptionItemCache: SubscriptionItem;
  private static usersFunctionSubscriptionItemCache: SubscriptionItem;

  public static async performLogin() {
    return await AzureAuth.login();
  }

  public static async getUserInfo() {
    this.userEmail = AzureAuth.getEmail();

    this.subscriptionItemList = await AzureAuth.getSubscriptions();

    const subscriptionListToDisplay = this.subscriptionItemList.map(
      subscriptionItem => {
        return {
          label: subscriptionItem.label,
          value: subscriptionItem.label
        };
      }
    );
    return {
      email: this.userEmail,
      subscriptions: subscriptionListToDisplay
    };
  }

  /**
   * @param subscriptionLabel subscription label
   * @returns a Json object of Formatted Resource and Location strings
   *
   * */
  public static async getSubscriptionData(
    subscriptionLabel: string,
    AzureType: AzureResourceType
  ) {
    let subscriptionItem = this.subscriptionItemList.find(
      subscriptionItem => subscriptionItem.label === subscriptionLabel
    );
    if (subscriptionItem === undefined) {
      throw new SubscriptionError(CONSTANTS.ERRORS.SUBSCRIPTION_NOT_FOUND);
    }
    let resourceGroupItems = AzureAuth.getResourceGroupItems(
      subscriptionItem
    ).then(resourceGroups => {
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
    });

    var locationItems: LocationItem[] = [];

    switch (AzureType) {
      case AzureResourceType.Cosmos:
        locationItems = await AzureAuth.getLocationsForCosmos(subscriptionItem);
        break;
      case AzureResourceType.Functions:
        locationItems = await AzureAuth.getLocationsForFunctions(
          subscriptionItem
        );
        break;
    }

    let locations = [];
    locations.push(
      ...locationItems.map(location => {
        return {
          label: location.locationDisplayName,
          value: location.locationDisplayName
        };
      })
    );

    // Parallel setup
    return {
      resourceGroups: await resourceGroupItems,
      locations: locations
    };
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
      .catch(error => {
        throw error;
      });
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
      .catch(error => {
        throw error;
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
      let subscriptionItem = this.subscriptionItemList.find(
        subscriptionItem => subscriptionItem.label === subscriptionLabel
      );
      if (subscriptionItem) {
        this.usersCosmosDBSubscriptionItemCache = subscriptionItem;
      } else {
        throw new SubscriptionError(CONSTANTS.ERRORS.SUBSCRIPTION_NOT_FOUND);
      }
    }
  }

  private static async updateFunctionSubscriptionItemCache(
    subscriptionLabel: string
  ): Promise<void> {
    if (
      this.usersFunctionSubscriptionItemCache === undefined ||
      subscriptionLabel !== this.usersFunctionSubscriptionItemCache.label
    ) {
      let subscriptionItem = this.subscriptionItemList.find(
        subscriptionItem => subscriptionItem.label === subscriptionLabel
      );
      if (subscriptionItem) {
        this.usersFunctionSubscriptionItemCache = subscriptionItem;
      } else {
        throw new SubscriptionError(CONSTANTS.ERRORS.SUBSCRIPTION_NOT_FOUND);
      }
    }
  }



  public static async promptUserForCosmosReplacement(
    pathToEnv: string,
    dbObject: DatabaseObject
  ) {
    return await vscode.window
      .showInformationMessage(
        DialogMessages.cosmosDBConnectStringReplacePrompt,
        ...[DialogResponses.yes, DialogResponses.no]
      )
      .then((selection: vscode.MessageItem | undefined) => {
        var start = Date.now();
        if (selection === DialogResponses.yes) {
          CosmosDBDeploy.updateConnectionStringInEnvFile(
            pathToEnv,
            dbObject.connectionString
          );
          vscode.window.showInformationMessage(
            CONSTANTS.INFO.FILE_REPLACED_MESSAGE + pathToEnv
          );
        }
        return {userReplacedEnv: selection === DialogResponses.yes, startTime: start};
      });
  }
}
