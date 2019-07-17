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
import {
  SubscriptionError,
  AuthorizationError,
  ValidationError
} from "../errors";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import { AppNameValidationResult, NameValidator } from "./utils/nameValidator";
import { Logger } from "../utils/logger";
import {
  ResourceGroupDeploy,
  ResourceGroupSelection
} from "./azure-resource-group/resourceGroupModule";
import { AppServiceProvider } from "./azure-app-service/appServiceProvider";

export class AzureServices extends WizardServant {
  clientCommandMap: Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  > = new Map([
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
      ExtensionCommand.SubscriptionDataForAppService,
      AzureServices.sendAppServiceSubscriptionDataToClient
    ],
    [
      ExtensionCommand.NameFunctions,
      AzureServices.sendFunctionNameValidationStatusToClient
    ],
    [
      ExtensionCommand.NameCosmos,
      AzureServices.sendCosmosNameValidationStatusToClient
    ],
    [
      ExtensionCommand.NameAppService,
      AzureServices.sendAppServiceNameValidationStatusToClient
    ]
  ]);

  private static AzureFunctionProvider = new FunctionProvider();
  private static AzureCosmosDBProvider = new CosmosDBDeploy();
  private static AzureAppServiceProvider = new AppServiceProvider();
  private static AzureResourceGroupProvider = new ResourceGroupDeploy();

  private static subscriptionItemList: SubscriptionItem[] = [];

  private static usersFunctionSubscriptionItemCache: SubscriptionItem;
  private static usersCosmosDBSubscriptionItemCache: SubscriptionItem;
  private static userAppServiceSubsctiptionItemCache: SubscriptionItem;

  public static async performLoginForSubscriptions(
    message: any
  ): Promise<IPayloadResponse> {
    Logger.appendLog("EXTENSION", "info", "Attempt to log user in");
    let isLoggedIn = await AzureAuth.login();
    if (isLoggedIn) {
      Logger.appendLog("EXTENSION", "info", "User logged in");
      return AzureServices.sendUserStatusIfLoggedIn(message);
    }
    throw new AuthorizationError(CONSTANTS.ERRORS.LOGIN_TIMEOUT);
  }

  public static async sendUserStatusIfLoggedIn(
    message: any
  ): Promise<IPayloadResponse> {
    if (AzureAuth.getEmail()) {
      AzureServices.subscriptionItemList = await AzureAuth.getSubscriptions();
      const subscriptionListToDisplay = AzureServices.subscriptionItemList.map(
        subscriptionItem => {
          return {
            label: subscriptionItem.label,
            value: subscriptionItem.label
          };
        }
      );
      return {
        payload: {
          email: AzureAuth.getEmail(),
          subscriptions: subscriptionListToDisplay
        }
      };
    } else {
      return { payload: null };
    }
  }
  public static async performLogout(message: any): Promise<IPayloadResponse> {
    let success = await AzureAuth.logout();
    let payloadResponse: IPayloadResponse = { payload: success };
    return payloadResponse;
  }
  public static async sendAppServiceSubscriptionDataToClient(
    message: any
  ): Promise<IPayloadResponse> {
    return {
      payload: await AzureServices.getSubscriptionData(
        message.subscription,
        AzureResourceType.AppService
      )
    };
  }

  public static async sendCosmosSubscriptionDataToClient(
    message: any
  ): Promise<IPayloadResponse> {
    return {
      payload: await AzureServices.getSubscriptionData(
        message.subscription,
        AzureResourceType.Cosmos
      )
    };
  }

  public static async sendFunctionsSubscriptionDataToClient(
    message: any
  ): Promise<IPayloadResponse> {
    return {
      payload: await AzureServices.getSubscriptionData(
        message.subscription,
        AzureResourceType.Functions
      )
    };
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
    let subscriptionItem = AzureServices.subscriptionItemList.find(
      subscriptionItem => subscriptionItem.label === subscriptionLabel
    );
    if (subscriptionItem === undefined) {
      throw new SubscriptionError(CONSTANTS.ERRORS.SUBSCRIPTION_NOT_FOUND);
    }
    let resourceGroupItems = AzureAuth.getAllResourceGroupItems(
      subscriptionItem
    ).then(resourceGroups => {
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
      case AzureResourceType.AppService:
        locationItems = await AzureAuth.getLocationsForApp(subscriptionItem);
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

    return {
      resourceGroups: await resourceGroupItems,
      locations: locations
    };
  }

  public static async sendAppServiceNameValidationStatusToClient(
    message: any
  ): Promise<IPayloadResponse> {
    await AzureServices.updateAppServiceSubscriptionItemCache(
      message.subscription
    );
    return await AzureServices.AzureAppServiceProvider.checkWebAppName(
      message.appName,
      AzureServices.userAppServiceSubsctiptionItemCache
    )
      .then((invalidReason: string | undefined) => {
        return {
          payload: {
            isAvailable:
              !invalidReason ||
              invalidReason === undefined ||
              invalidReason === "",
            reason: invalidReason
          }
        };
      })
      .catch((error: Error) => {
        throw error; //to log in telemetry
      });
  }

  public static async sendCosmosNameValidationStatusToClient(
    message: any
  ): Promise<IPayloadResponse> {
    await AzureServices.updateCosmosDBSubscriptionItemCache(
      message.subscription
    );

    return await AzureServices.AzureCosmosDBProvider.validateCosmosDBAccountName(
      message.appName,
      AzureServices.usersCosmosDBSubscriptionItemCache
    )
      .then((invalidReason: string | undefined) => {
        return {
          payload: {
            isAvailable:
              !invalidReason ||
              invalidReason === undefined ||
              invalidReason === "",
            reason: invalidReason
          }
        };
      })
      .catch((error: Error) => {
        throw error; //to log in telemetry
      });
  }

  public static async sendFunctionNameValidationStatusToClient(
    message: any
  ): Promise<IPayloadResponse> {
    await AzureServices.updateFunctionSubscriptionItemCache(
      message.subscription
    );
    return AzureServices.AzureFunctionProvider.checkFunctionAppName(
      message.appName,
      AzureServices.usersFunctionSubscriptionItemCache
    )
      .then((invalidReason: string | undefined) => {
        return {
          payload: {
            isAvailable:
              !invalidReason ||
              invalidReason === undefined ||
              invalidReason === "",
            reason: invalidReason
          }
        };
      })
      .catch((error: Error) => {
        throw error; //to log in telemetry
      });
  }

  /*
   * Caching is used for performance; when displaying live check on keystroke to wizard
   */

  private static async updateAppServiceSubscriptionItemCache(
    subscriptionLabel: string
  ) {
    if (
      AzureServices.userAppServiceSubsctiptionItemCache === undefined ||
      subscriptionLabel !==
        AzureServices.userAppServiceSubsctiptionItemCache.label
    ) {
      let subscriptionItem = AzureServices.subscriptionItemList.find(
        subscriptionItem => subscriptionItem.label === subscriptionLabel
      );
      if (subscriptionItem) {
        AzureServices.userAppServiceSubsctiptionItemCache = subscriptionItem;
      } else {
        throw new SubscriptionError(CONSTANTS.ERRORS.SUBSCRIPTION_NOT_FOUND);
      }
    }
  }

  private static async updateCosmosDBSubscriptionItemCache(
    subscriptionLabel: string
  ): Promise<void> {
    if (
      AzureServices.usersCosmosDBSubscriptionItemCache === undefined ||
      subscriptionLabel !==
        AzureServices.usersCosmosDBSubscriptionItemCache.label
    ) {
      let subscriptionItem = AzureServices.subscriptionItemList.find(
        subscriptionItem => subscriptionItem.label === subscriptionLabel
      );
      if (subscriptionItem) {
        AzureServices.usersCosmosDBSubscriptionItemCache = subscriptionItem;
      } else {
        throw new SubscriptionError(CONSTANTS.ERRORS.SUBSCRIPTION_NOT_FOUND);
      }
    }
  }

  private static async updateFunctionSubscriptionItemCache(
    subscriptionLabel: string
  ): Promise<void> {
    if (
      AzureServices.usersFunctionSubscriptionItemCache === undefined ||
      subscriptionLabel !==
        AzureServices.usersFunctionSubscriptionItemCache.label
    ) {
      let subscriptionItem = AzureServices.subscriptionItemList.find(
        subscriptionItem => subscriptionItem.label === subscriptionLabel
      );
      if (subscriptionItem) {
        AzureServices.usersFunctionSubscriptionItemCache = subscriptionItem;
      } else {
        throw new SubscriptionError(CONSTANTS.ERRORS.SUBSCRIPTION_NOT_FOUND);
      }
    }
  }

  public static async generateDistinctResourceGroupSelections(
    payload: any
  ): Promise<ResourceGroupSelection[]> {
    const projectName = payload.engine.projectName;
    let allSubscriptions: SubscriptionItem[] = [];

    if (AzureServices.functionsSelectedNewResourceGroup(payload)) {
      await AzureServices.updateFunctionSubscriptionItemCache(
        payload.functions.subscription
      );
      allSubscriptions.push(AzureServices.usersFunctionSubscriptionItemCache);
    }
    if (AzureServices.cosmosDBSelectedNewResourceGroup(payload)) {
      await AzureServices.updateCosmosDBSubscriptionItemCache(
        payload.cosmos.subscription
      );
      allSubscriptions.push(AzureServices.usersCosmosDBSubscriptionItemCache);
    }
    const allDistinctSubscriptions: SubscriptionItem[] = [
      ...new Set(allSubscriptions)
    ];
    const generatedName: string = await AzureServices.AzureResourceGroupProvider.generateValidResourceGroupName(
      projectName,
      allDistinctSubscriptions
    );

    return allDistinctSubscriptions.map(subscription =>
      AzureServices.generateResourceGroupSelection(generatedName, subscription)
    );
  }

  public static functionsSelectedNewResourceGroup(payload: any): boolean {
    return payload.selectedFunctions && payload.functions.resourceGroup === "";
  }

  public static cosmosDBSelectedNewResourceGroup(payload: any): boolean {
    return payload.selectedCosmos && payload.cosmos.resourceGroup === "";
  }

  private static generateResourceGroupSelection(
    generatedName: string,
    subscriptionItem: SubscriptionItem
  ): ResourceGroupSelection {
    return {
      subscriptionItem: subscriptionItem,
      resourceGroupName: generatedName,
      location: CONSTANTS.AZURE_LOCATION.CENTRAL_US
    };
  }

  public static async deployResourceGroup(
    selections: ResourceGroupSelection
  ): Promise<any> {
    return await AzureServices.AzureResourceGroupProvider.createResourceGroup(
      selections
    );
  }

  public static async deployFunctionApp(
    selections: any,
    appPath: string
  ): Promise<void> {
    await AzureServices.updateFunctionSubscriptionItemCache(
      selections.subscription
    );

    let userFunctionsSelections: FunctionSelections = {
      functionAppName: selections.appName,
      subscriptionItem: AzureServices.usersFunctionSubscriptionItemCache,
      resourceGroupItem: await AzureAuth.getResourceGroupItem(
        selections.resourceGroup,
        AzureServices.usersFunctionSubscriptionItemCache
      ),
      location: selections.location,
      runtime: selections.runtimeStack,
      functionNames: selections.functionNames
    };

    let functionNamesValidation: AppNameValidationResult = NameValidator.validateFunctionNames(
      userFunctionsSelections.functionNames
    );
    if (!functionNamesValidation.isValid) {
      throw new ValidationError(functionNamesValidation.message);
    }

    await AzureServices.AzureFunctionProvider.checkFunctionAppName(
      userFunctionsSelections.functionAppName,
      userFunctionsSelections.subscriptionItem
    )
      .then(invalidReason => {
        if (invalidReason !== undefined && invalidReason === "") {
          throw new ValidationError(invalidReason);
        }
      })
      .catch((error: Error) => {
        throw error; //to log in telemetry
      });

    return await AzureServices.AzureFunctionProvider.createFunctionApp(
      userFunctionsSelections,
      appPath
    );
  }

  public static async deployCosmosResource(
    selections: any,
    genPath: string
  ): Promise<DatabaseObject> {
    await AzureServices.updateCosmosDBSubscriptionItemCache(
      selections.subscription
    );

    let userCosmosDBSelection: CosmosDBSelections = {
      cosmosAPI: selections.api,
      cosmosDBResourceName: selections.accountName,
      location: selections.location,
      resourceGroupItem: await AzureAuth.getResourceGroupItem(
        selections.resourceGroup,
        AzureServices.usersCosmosDBSubscriptionItemCache
      ),
      subscriptionItem: AzureServices.usersCosmosDBSubscriptionItemCache
    };

    await AzureServices.AzureCosmosDBProvider.validateCosmosDBAccountName(
      userCosmosDBSelection.cosmosDBResourceName,
      userCosmosDBSelection.subscriptionItem
    )
      .then(invalidReason => {
        if (invalidReason !== undefined && invalidReason === "") {
          throw new ValidationError(invalidReason);
        }
      })
      .catch((error: Error) => {
        throw error; //to log in telemetry
      });

    return await AzureServices.AzureCosmosDBProvider.createCosmosDB(
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
