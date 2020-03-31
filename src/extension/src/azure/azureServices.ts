import * as vscode from "vscode";
import { MICROSOFT_LEARN_TENANTS } from "./../configuration.json";

import { AzureAuth, SubscriptionItem } from "./azure-auth/azureAuth";
import { CosmosDBDeploy, CosmosDBSelections, DatabaseObject } from "./azure-cosmosDB/cosmosDbModule";
import {
  CONSTANTS,
  AzureResourceType,
  DialogMessages,
  DialogResponses,
} from "../constants";
import { SubscriptionError, ValidationError } from "../errors";
import { ResourceGroupDeploy, ResourceGroupSelection } from "./azure-resource-group/resourceGroupModule";
import { AppServiceProvider, AppServiceSelections } from "./azure-app-service/appServiceProvider";
import { StringDictionary } from "azure-arm-website/lib/models";
import { ConnectionString } from "./utils/connectionString";

interface UserStatus {
  email: string;
  subscriptions: SubscriptionItem[];
}

interface ValidateResult {
  isValid: boolean;
  errorMessage: string;
}

export class AzureServices {
  private static AzureCosmosDBProvider = new CosmosDBDeploy();
  private static AzureAppServiceProvider = new AppServiceProvider();
  private static AzureResourceGroupProvider = new ResourceGroupDeploy();
  private static subscriptionsCache: SubscriptionItem[] = [];

  public static async getUserStatus(): Promise<UserStatus> {
    const email = AzureAuth.getEmail();
    let subscriptions: SubscriptionItem[] = [];

    if (email) {
      subscriptions = await AzureServices.getSubscriptions();
    }
    return { email, subscriptions };
  }

  public static async getSubscriptions(): Promise<SubscriptionItem[]> {
    if (AzureServices.subscriptionsCache.length === 0) {
      AzureServices.subscriptionsCache = await AzureAuth.getSubscriptions();
    }
    return AzureServices.subscriptionsCache;
  }

  public static CleanSubscriptionCache(): void {
    AzureServices.subscriptionsCache.length = 0;
  }

  public static getSubscription(name: string): SubscriptionItem {
    const subscription = AzureServices.subscriptionsCache.find(item => item.label === name);

    if (!subscription) {
      throw new SubscriptionError(CONSTANTS.ERRORS.SUBSCRIPTION_NOT_FOUND);
    }

    return subscription;
  }

  public static IsMicrosoftLearnSubscription(subscription: SubscriptionItem): boolean {
    return MICROSOFT_LEARN_TENANTS.includes(subscription.session.tenantId);
  }

  public static async validateAppServiceName(name: string, subscription: string): Promise<ValidateResult> {
    const subscriptionItem = AzureServices.getSubscription(subscription);
    const message = await AzureServices.AzureAppServiceProvider.checkWebAppName(name, subscriptionItem);
    return {
      isValid: !message || message === "",
      errorMessage: message ? message : "",
    };
  }

  public static async validateCosmosName(name: string, subscription: string): Promise<ValidateResult> {
    const subscriptionItem = AzureServices.getSubscription(subscription);
    const message = await AzureServices.AzureCosmosDBProvider.validateCosmosDBAccountName(name, subscriptionItem);
    return {
      isValid: !message || message === "",
      errorMessage: message ? message : "",
    };
  }

  public static async generateDistinctResourceGroupSelections(payload: any): Promise<ResourceGroupSelection[]> {
    const projectName = payload.engine.projectName;
    const allSubscriptions: SubscriptionItem[] = [];    
    if (payload.selectedCosmos) {
      const cosmosSubscription = AzureServices.getSubscription(payload.cosmos.subscription);    
      allSubscriptions.push(cosmosSubscription);
    }
    if (payload.selectedAppService) {
      const appserviceSubscription = AzureServices.getSubscription(payload.appService.subscription);
      allSubscriptions.push(appserviceSubscription);
    }
    const allDistinctSubscriptions: SubscriptionItem[] = [...new Set(allSubscriptions)];

    const generatedName: string = await AzureServices.AzureResourceGroupProvider.generateValidResourceGroupName(
      projectName,
      allDistinctSubscriptions
    );

    return await Promise.all(
      allDistinctSubscriptions.map(
        async subscription => await AzureServices.generateResourceGroupSelection(generatedName, subscription)
      )
    );
  }

  private static async generateResourceGroupSelection(
    generatedName: string,
    subscriptionItem: SubscriptionItem
  ): Promise<ResourceGroupSelection> {
    let resourceGroupName = generatedName;
    if (AzureServices.IsMicrosoftLearnSubscription(subscriptionItem)) {
      const resourceGroups = await AzureServices.AzureResourceGroupProvider.GetResourceGroups(subscriptionItem);
      resourceGroupName = resourceGroups[0].name as string;
    }
    return {
      subscriptionItem: subscriptionItem,
      resourceGroupName: resourceGroupName,
      location: CONSTANTS.AZURE_LOCATION.CENTRAL_US,
    };
  }

  public static async deployResourceGroup(selections: ResourceGroupSelection): Promise<any> {
    if (!AzureServices.IsMicrosoftLearnSubscription(selections.subscriptionItem)) {
      return await AzureServices.AzureResourceGroupProvider.createResourceGroup(selections);
    }
  }

  public static async deployWebApp(payload: any): Promise<string> {
    const subscription = AzureServices.getSubscription(payload.appService.subscription);
    const aspName = await AzureServices.AzureAppServiceProvider.generateValidASPName(payload.engine.projectName);

    const appServicePlan = AzureServices.IsMicrosoftLearnSubscription(subscription)
      ? CONSTANTS.SKU_DESCRIPTION.FREE
      : CONSTANTS.SKU_DESCRIPTION.BASIC;

    const userAppServiceSelection: AppServiceSelections = {
      siteName: payload.appService.siteName,
      subscriptionItem: subscription,
      resourceGroupItem: await AzureAuth.getResourceGroupItem(payload.appService.resourceGroup, subscription),
      appServicePlanName: aspName,
      tier: appServicePlan.tier,
      sku: appServicePlan.name,
      linuxFxVersion: payload.engine.backendFrameworkLinuxVersion,
      location: CONSTANTS.AZURE_LOCATION.CENTRAL_US,
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
    return rawId.replace(MS_RESOURCE_DEPLOYMENT, MS_WEB_SITE).replace("-" + AzureResourceType.AppService, "");
  }

  public static async deployCosmosResource(selections: any, genPath: string): Promise<DatabaseObject> {
    const subscription = AzureServices.getSubscription(selections.subscription);

    const userCosmosDBSelection: CosmosDBSelections = {
      cosmosAPI: selections.api,
      cosmosDBResourceName: selections.accountName,
      location: CONSTANTS.AZURE_LOCATION.CENTRAL_US,
      resourceGroupItem: await AzureAuth.getResourceGroupItem(selections.resourceGroup, subscription),
      subscriptionItem: subscription,
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

    return await AzureServices.AzureCosmosDBProvider.createCosmosDB(userCosmosDBSelection, genPath);
  }

  public static async promptUserForCosmosReplacement(pathToEnv: string, dbObject: DatabaseObject): Promise<any> {
    return await vscode.window
      .showInformationMessage(
        DialogMessages.cosmosDBConnectStringReplacePrompt,
        ...[DialogResponses.yes, DialogResponses.no]
      )
      .then((selection: vscode.MessageItem | undefined) => {
        const start = Date.now();
        if (selection === DialogResponses.yes) {
          CosmosDBDeploy.updateConnectionStringInEnvFile(pathToEnv, dbObject.connectionString);
          vscode.window.showInformationMessage(CONSTANTS.INFO.FILE_REPLACED_MESSAGE + pathToEnv);
        }
        return {
          userReplacedEnv: selection === DialogResponses.yes,
          startTime: start,
        };
      });
  }

  public static async updateAppSettings(
    resourceGroupName: string,
    webAppName: string,
    connectionString: string
  ): Promise<void> {
    const parsed: string = ConnectionString.parseConnectionString(connectionString);
    const settings: StringDictionary = {
      properties: AzureServices.convertToSettings(parsed),
    };

    AzureServices.AzureAppServiceProvider.updateAppSettings(resourceGroupName, webAppName, settings);
  }

  private static convertToSettings(parsedConnectionString: string): { [s: string]: string } {
    // format of parsedConnectionString: "<key1>=<value1>\n<key2>=<value2>\n<key3>=<value3>\n"
    const fields = parsedConnectionString.split("\n");
    const result: { [s: string]: string } = {};
    for (let i = 0; i < fields.length - 1; i++) {
      const key = fields[i].substr(0, fields[i].indexOf("="));
      const value = fields[i].substr(fields[i].indexOf("=") + 1);
      result[key] = value;
    }
    return result;
  }
}
