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
  ExtensionCommand,
  BackendFrameworkLinuxVersion
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
import {
  AppServiceProvider,
  AppServiceSelections
} from "./azure-app-service/appServiceProvider";
import { NameGenerator } from "./utils/nameGenerator";
import { StringDictionary } from "azure-arm-website/lib/models";
import { ConnectionString } from "./utils/connectionString";

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
  private static usersAppServiceSubscriptionItemCache: SubscriptionItem;

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
        AzureResourceType.AppService,
        message.projectName
      )
    };
  }

  public static async sendCosmosSubscriptionDataToClient(
    message: any
  ): Promise<IPayloadResponse> {
    return {
      payload: await AzureServices.getSubscriptionData(
        message.subscription,
        AzureResourceType.Cosmos,
        message.projectName
      )
    };
  }

  public static async sendFunctionsSubscriptionDataToClient(
    message: any
  ): Promise<IPayloadResponse> {
    return {
      payload: await AzureServices.getSubscriptionData(
        message.subscription,
        AzureResourceType.Functions,
        message.projectName
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
    AzureType: AzureResourceType,
    projectName: string
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

    let locationItems: LocationItem[] = [];
    let validName: string = await NameGenerator.generateValidAzureTypeName(
      projectName,
      subscriptionItem,
      AzureType
    );

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
      locations: locations,
      validName: validName
    };
  }

  public static async validateNameForAzureType(
    projectName: string,
    userSubscriptionItem: SubscriptionItem,
    azureType: AzureResourceType
  ): Promise<boolean> {
    let validationResult;
    switch (azureType) {
      case AzureResourceType.AppService:
        validationResult = await AzureServices.AzureAppServiceProvider.checkWebAppName(
          projectName,
          userSubscriptionItem
        );
        break;
      case AzureResourceType.Cosmos:
        validationResult = await AzureServices.AzureCosmosDBProvider.validateCosmosDBAccountName(
          projectName,
          userSubscriptionItem
        );
        break;
      case AzureResourceType.Functions:
        validationResult = await AzureServices.AzureFunctionProvider.checkFunctionAppName(
          projectName,
          userSubscriptionItem
        );
        break;
    }
    return validationResult === undefined;
  }

  public static async sendAppServiceNameValidationStatusToClient(
    message: any
  ): Promise<IPayloadResponse> {
    await AzureServices.updateAppServiceSubscriptionItemCache(
      message.subscription
    );
    return await AzureServices.AzureAppServiceProvider.checkWebAppName(
      message.appName,
      AzureServices.usersAppServiceSubscriptionItemCache
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
      AzureServices.usersAppServiceSubscriptionItemCache === undefined ||
      subscriptionLabel !==
        AzureServices.usersAppServiceSubscriptionItemCache.label
    ) {
      let subscriptionItem = AzureServices.subscriptionItemList.find(
        subscriptionItem => subscriptionItem.label === subscriptionLabel
      );
      if (subscriptionItem) {
        AzureServices.usersAppServiceSubscriptionItemCache = subscriptionItem;
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

    if (payload.selectedFunctions) {
      await AzureServices.updateFunctionSubscriptionItemCache(
        payload.functions.subscription
      );
      allSubscriptions.push(AzureServices.usersFunctionSubscriptionItemCache);
    }
    if (payload.selectedCosmos) {
      await AzureServices.updateCosmosDBSubscriptionItemCache(
        payload.cosmos.subscription
      );
      allSubscriptions.push(AzureServices.usersCosmosDBSubscriptionItemCache);
    }
    if (payload.selectedAppService) {
      await AzureServices.updateAppServiceSubscriptionItemCache(
        payload.appService.subscription
      );
      allSubscriptions.push(AzureServices.usersAppServiceSubscriptionItemCache);
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

  public static async deployWebApp(payload: any): Promise<string> {
    await AzureServices.updateAppServiceSubscriptionItemCache(
      payload.appService.subscription
    );
    const aspName = await AzureServices.AzureAppServiceProvider.generateValidASPName(
      payload.engine.projectName
    );
    const userAppServiceSelection: AppServiceSelections = {
      siteName: payload.appService.siteName,
      subscriptionItem: AzureServices.usersAppServiceSubscriptionItemCache,
      resourceGroupItem: await AzureAuth.getResourceGroupItem(
        payload.appService.resourceGroup,
        AzureServices.usersAppServiceSubscriptionItemCache
      ),
      appServicePlanName: aspName,
      sku: CONSTANTS.SKU_DESCRIPTION.BASIC.name,
      linuxFxVersion:
        BackendFrameworkLinuxVersion[payload.engine.backendFramework],
      location: CONSTANTS.AZURE_LOCATION.CENTRAL_US
    };

    await AzureServices.AzureAppServiceProvider.checkWebAppName(
      userAppServiceSelection.siteName,
      userAppServiceSelection.subscriptionItem
    )
      .then(invalidReason => {
        if (invalidReason !== undefined && invalidReason === "") {
          throw new ValidationError(invalidReason);
        }
      })
      .catch((error: Error) => {
        throw error; //to log in telemetry
      });

    const result = await AzureServices.AzureAppServiceProvider.createWebApp(
      userAppServiceSelection,
      payload.engine.path
    );
    if (!result) {
      throw new Error(CONSTANTS.ERRORS.APP_SERVICE_UNDEFINED_ID);
    }
    return AzureServices.convertId(result);
  }

  private static convertId(rawId: string): string {
    // workaround to convert deployment id to app service id
    const MS_RESOURCE_DEPLOYMENT = "Microsoft.Resources/deployments";
    const MS_WEB_SITE = "Microsoft.Web/sites";
    return rawId
      .replace(MS_RESOURCE_DEPLOYMENT, MS_WEB_SITE)
      .replace("-" + AzureResourceType.AppService, "");
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
      location: CONSTANTS.AZURE_LOCATION.CENTRAL_US,
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
  public static async updateAppSettings(
    resourceGroupName: string,
    webAppName: string,
    connectionString: string
  ) {
    const parsed: string = ConnectionString.parseConnectionString(
      connectionString
    );
    const settings: StringDictionary = {
      properties: AzureServices.convertToSettings(parsed)
    };

    AzureServices.AzureAppServiceProvider.updateAppSettings(
      resourceGroupName,
      webAppName,
      settings
    );
  }

  private static convertToSettings(
    parsedConnectionString: string
  ): { [s: string]: string } {
    // format of parsedConnectionString: "<key1>=<value1>\n<key2>=<value2>\n<key3>=<value3>\n"
    const fields = parsedConnectionString.split("\n");
    const result: { [s: string]: string } = {};
    for (let i: number = 0; i < fields.length - 1; i++) {
      let key = fields[i].substr(0, fields[i].indexOf("="));
      let value = fields[i].substr(fields[i].indexOf("=") + 1);
      result[key] = value;
    }
    return result;
  }
}
