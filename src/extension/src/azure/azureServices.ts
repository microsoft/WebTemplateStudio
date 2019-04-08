import * as vscode from "vscode";
import {
  AzureAuth,
  SubscriptionItem,
  LocationItem
} from "./azure-auth/azureAuth";
import {
  CosmosDBDeploy,
  CosmosDBSelections,
  DatabaseObject
} from "./azure-cosmosDB/cosmosDbModule";
import {
  FunctionProvider,
  FunctionSelections
} from "./azure-functions/functionProvider";
import {
  CONSTANTS,
  AzureResourceType,
  DialogMessages,
  DialogResponses,
  ExtensionCommand
} from "../constants";
import { SubscriptionError } from "../errors";
import { Extensible } from "../extensible";

export class AzureServices extends Extensible {
  clientCommandMap: Map<ExtensionCommand, (message: any) => Object> = new Map([
    [ExtensionCommand.Login, AzureServices.performLoginForSubscriptions],
    [ExtensionCommand.GetUserStatus, AzureServices.sendUserStatusIfLoggedIn],
    [ExtensionCommand.Logout, AzureServices.performLogout],
    [
      ExtensionCommand.SubscriptionDataForCosmos,
      AzureServices.sendCosmosSubscriptionDataToClient
    ],
    [
      ExtensionCommand.SubscriptionDataForFunctions,
      AzureServices.sendFunctionsSubscriptionDataToClient
    ],
    [
      ExtensionCommand.NameFunctions,
      AzureServices.sendFunctionNameValidationStatusToClient
    ],
    [
      ExtensionCommand.NameCosmos,
      AzureServices.sendCosmosNameValidationStatusToClient
    ]
  ]);

  private static AzureFunctionProvider = new FunctionProvider();
  private static AzureCosmosDBProvider = new CosmosDBDeploy();

  private static subscriptionItemList: SubscriptionItem[] = [];

  private static usersCosmosDBSubscriptionItemCache: SubscriptionItem;
  private static usersFunctionSubscriptionItemCache: SubscriptionItem;

  public static async performLoginForSubscriptions(message: any) {
    let isLoggedIn = await AzureAuth.login();
    if (isLoggedIn) {
      AzureServices.sendUserStatusIfLoggedIn(message);
    }
  }

  public static async sendUserStatusIfLoggedIn(message: any) {
    let azureSubscriptions = await AzureAuth.getSubscriptions();
    const subscriptionListToDisplay = azureSubscriptions.map(
      subscriptionItem => {
        return {
          label: subscriptionItem.label,
          value: subscriptionItem.label
        };
      }
    );
    return {
      email: AzureAuth.getEmail(),
      subscriptions: subscriptionListToDisplay
    };
  }
  public static async performLogout() {
    return await AzureAuth.logout();
  }

  public static sendCosmosSubscriptionDataToClient(message: any) {
    return this.getSubscriptionData(
      message.subscription,
      AzureResourceType.Cosmos
    );
  }

  public static sendFunctionsSubscriptionDataToClient(message: any) {
    return this.getSubscriptionData(
      message.subscription,
      AzureResourceType.Functions
    );
  }

  /**
   * @param subscriptionLabel subscription label
   * @returns a Json object of Formatted Resource and Location strings
   *
   * */
  private static async getSubscriptionData(
    subscriptionLabel: string,
    AzureType: AzureResourceType
  ) {
    let subscriptionItem = this.subscriptionItemList.find(
      subscriptionItem => subscriptionItem.label === subscriptionLabel
    );
    if (subscriptionItem === undefined) {
      throw new SubscriptionError(CONSTANTS.ERRORS.SUBSCRIPTION_NOT_FOUND);
    }
    let resourceGroupItems = AzureAuth.getAllResourceGroupItems(
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

  public static async sendCosmosNameValidationStatusToClient(message: any) {
    await this.updateCosmosDBSubscriptionItemCache(message.subscription);

    let invalidReason = await this.AzureCosmosDBProvider.validateCosmosDBAccountName(
      message.appName,
      this.usersCosmosDBSubscriptionItemCache
    );
    return {
      isAvailable:
        !invalidReason || invalidReason === undefined || invalidReason === "",
        reason: invalidReason
    };
  }

  // {
  //   command: ExtensionCommand.NameCosmos,
  //   message: invalidReason,
  //   payload: {isAvailable:
  //     !invalidReason ||
  //     invalidReason === undefined ||
  //     invalidReason === ""}
  // }

  // private static async validateCosmosAccountName(
  //   cosmosDBAccountName: string,
  //   subscriptionLabel: string
  // ): Promise<string | undefined> {
  //   return await this.AzureCosmosDBProvider.validateCosmosDBAccountName(
  //     cosmosDBAccountName,
  //     this.usersCosmosDBSubscriptionItemCache
  //   );
  // }

  public static async sendFunctionNameValidationStatusToClient(message: any) {
    await this.updateFunctionSubscriptionItemCache(message.subscription);
    let isValid = this.AzureFunctionProvider.checkFunctionAppName(
      message.appName,
      this.usersFunctionSubscriptionItemCache
    );
    return { isAvailable: isValid }
  }

  public static async validateFunctionAppName(
    functionAppName: string,
    subscriptionLabel: string
  ): Promise<boolean | undefined> {
    await this.updateFunctionSubscriptionItemCache(subscriptionLabel);

    return this.AzureFunctionProvider.checkFunctionAppName(
      functionAppName,
      this.usersFunctionSubscriptionItemCache
    );
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

  public static async deployFunctionApp(
    selections: any,
    appPath: string
  ): Promise<void> {
    await this.updateFunctionSubscriptionItemCache(selections.subscription);

    let userFunctionsSelections: FunctionSelections = {
      functionAppName: selections.appName,
      subscriptionItem: this.usersFunctionSubscriptionItemCache,
      resourceGroupItem: await AzureAuth.getResourceGroupItem(
        selections.resourceGroup,
        this.usersFunctionSubscriptionItemCache
      ),
      location: selections.location,
      runtime: selections.runtimeStack,
      functionNames: selections.functionNames
    };

    let functionProvider = new FunctionProvider();

    return await functionProvider.createFunctionApp(
      userFunctionsSelections,
      appPath
    );
  }

  public static async deployCosmosResource(
    selections: any,
    genPath: string
  ): Promise<DatabaseObject> {
    try {
      await this.validateCosmosAccountName(
        selections.accountName,
        selections.subscription
      );
    } catch (error) {
      return Promise.reject(error);
    }

    let userCosmosDBSelection: CosmosDBSelections = {
      cosmosAPI: selections.api,
      cosmosDBResourceName: selections.accountName,
      location: selections.location,
      resourceGroupItem: await AzureAuth.getResourceGroupItem(
        selections.resourceGroup,
        this.usersCosmosDBSubscriptionItemCache
      ),
      subscriptionItem: this.usersCosmosDBSubscriptionItemCache
    };

    return await this.AzureCosmosDBProvider.createCosmosDB(
      userCosmosDBSelection,
      genPath
    );
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
        return {
          userReplacedEnv: selection === DialogResponses.yes,
          startTime: start
        };
      });
  }
}
