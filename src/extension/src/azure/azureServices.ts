import { MICROSOFT_LEARN_TENANTS } from "./../configuration.json";

import { AzureAuth, SubscriptionItem, LocationItem } from "./azure-auth/azureAuth";
import { CosmosDBDeploy, CosmosDBSelections } from "./azure-cosmosDB/cosmosDbModule";
import { CONSTANTS, AzureResourceType } from "../constants/constants";
import { SubscriptionError, ValidationError } from "../errors";
import { ResourceGroupDeploy, ResourceGroupSelection } from "./azure-resource-group/resourceGroupModule";
import { AppServiceProvider, AppServiceSelections } from "./azure-app-service/appServiceProvider";
import { ConnectionString } from "./utils/connectionString";
import * as fse from "fs-extra";
import * as path from "path";
import { MESSAGES } from "../constants/messages";
import { IAppService, IAzureService, ICosmosDB } from "../types/generationTypes";

interface UserStatus {
  email: string;
  subscriptions: SubscriptionItem[];
}

interface ValidateResult {
  isValid: boolean;
  errorMessage: string;
}

interface ResourceGroup {
  name: string;
}

interface AzureLocation {
  name: string;
}

export class AzureServices {
  private static AzureCosmosDBProvider = new CosmosDBDeploy();
  private static AzureAppServiceProvider = new AppServiceProvider();
  private static AzureResourceGroupProvider = new ResourceGroupDeploy();
  private static subscriptionsCache: SubscriptionItem[] = [];

  public static async Login(): Promise<boolean> {
    return await AzureAuth.login();
  }

  public static async Logout(): Promise<boolean> {
    const success = await AzureAuth.logout();
    AzureServices.CleanSubscriptionCache();
    return success;
  }

  public static async getUserStatus(): Promise<UserStatus> {
    const email = AzureAuth.getEmail();
    let subscriptions: SubscriptionItem[] = [];

    if (email) {
      subscriptions = await AzureServices.getSubscriptionsFromAzure();
    }
    return { email, subscriptions };
  }

  public static async getSubscriptionsFromAzure(): Promise<SubscriptionItem[]> {
    if (AzureServices.subscriptionsCache.length === 0) {
      AzureServices.subscriptionsCache = await AzureAuth.getSubscriptions();
    }
    return AzureServices.subscriptionsCache;
  }

  private static CleanSubscriptionCache(): void {
    AzureServices.subscriptionsCache.length = 0;
  }

  public static getSubscription(name: string): SubscriptionItem {
    const subscription = AzureServices.subscriptionsCache.find((item) => item.label === name);

    if (!subscription) {
      throw new SubscriptionError(MESSAGES.ERRORS.SUBSCRIPTION_NOT_FOUND);
    }

    return subscription;
  }

  public static getSubscriptions(names: string[]): SubscriptionItem[] {
    const subscriptions = AzureServices.subscriptionsCache.filter((item) => names.includes(item.label));
    if (subscriptions.length != names.length) {
      throw new SubscriptionError(MESSAGES.ERRORS.SUBSCRIPTION_NOT_FOUND);
    }
    return [...new Set(subscriptions)];
  }

  public static IsMicrosoftLearnSubscription(subscription: SubscriptionItem): boolean {
    return MICROSOFT_LEARN_TENANTS.includes(subscription.session.tenantId);
  }

  public static async getResourceGroups(subscriptionName: string): Promise<ResourceGroup[]> {
    const subscription = AzureServices.getSubscription(subscriptionName);
    const items = await AzureAuth.getAllResourceGroupItems(subscription);
    const resources: ResourceGroup[] = [];
    items.map((item) => resources.push({ name: item.name }));
    return resources;
  }

  public static async getLocations(
    subscriptionName: string,
    azureServiceType: AzureResourceType
  ): Promise<AzureLocation[]> {
    const subscription = AzureServices.getSubscription(subscriptionName);
    let items: LocationItem[] = [];
    switch (azureServiceType) {
      case AzureResourceType.Cosmos:
        items = await AzureAuth.getLocationsForCosmos(subscription);
        break;
      case AzureResourceType.AppService:
        items = await AzureAuth.getLocationsForApp(subscription);
        break;
    }
    const locations: AzureLocation[] = [];
    items.map((item) => locations.push({ name: item.locationDisplayName }));
    return locations;
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

  public static async getResourceGroupSelections(services: IAzureService[]): Promise<ResourceGroupSelection[]> {
    const selection: ResourceGroupSelection[] = [];

    for (const service of services) {
      const { subscription, resourceGroup } = service;
      const subscriptionItem = AzureServices.getSubscription(subscription);
      const canCreateResourceGroup = await AzureServices.canCreateResourceGroup(
        subscriptionItem,
        resourceGroup,
        selection
      );
      if (canCreateResourceGroup) {
        selection.push({
          subscriptionItem,
          resourceGroupName: resourceGroup,
          location: CONSTANTS.AZURE_LOCATION.CENTRAL_US,
        });
      }
    }

    return selection;
  }

  private static async canCreateResourceGroup(
    subscriptionItem: SubscriptionItem,
    resourceGroup: string,
    selection: ResourceGroupSelection[]
  ): Promise<boolean> {
    const isMicrosoftLearnSubscription = AzureServices.IsMicrosoftLearnSubscription(subscriptionItem);
    const existResourceGroup = await AzureServices.AzureResourceGroupProvider.ExistResourceGroup(
      resourceGroup,
      subscriptionItem
    );
    const isResourceGroupInSelection = selection.some(
      (r) => r.resourceGroupName === resourceGroup && r.subscriptionItem.label === subscriptionItem.label
    );
    return !(existResourceGroup || isResourceGroupInSelection || isMicrosoftLearnSubscription);
  }

  public static async generateValidResourceGroupName(projectName: string, services: IAzureService[]): Promise<string> {
    const subscriptions: SubscriptionItem[] = [];

    const subscriptionNames = services.map((s) => s.subscription);
    const subscriptionItems = AzureServices.getSubscriptions([...new Set(subscriptionNames)]);
    subscriptions.push(...subscriptionItems);

    const allSubscriptions: SubscriptionItem[] = [...new Set(subscriptions)];

    return await AzureServices.AzureResourceGroupProvider.generateValidResourceGroupName(projectName, allSubscriptions);
  }

  public static async deployResourceGroup(resourceGroupSelection: ResourceGroupSelection): Promise<void> {
    const name = resourceGroupSelection.resourceGroupName;
    const subscription = resourceGroupSelection.subscriptionItem;
    const resourceGroup = await AzureServices.AzureResourceGroupProvider.GetResourceGroup(name, subscription);

    if (!resourceGroup) {
      await AzureServices.AzureResourceGroupProvider.createResourceGroup(resourceGroupSelection);
    }
  }

  public static async deployAppService(
    appService: IAppService,
    projectName: string,
    backendFrameworkLinuxVersion: string,
    path: string
  ): Promise<void> {
    const subscription = AzureServices.getSubscription(appService.subscription);
    const aspName = await AzureServices.AzureAppServiceProvider.generateValidASPName(projectName);

    const appServicePlan = AzureServices.IsMicrosoftLearnSubscription(subscription)
      ? CONSTANTS.SKU_DESCRIPTION.FREE
      : CONSTANTS.SKU_DESCRIPTION.BASIC;

    const userAppServiceSelection: AppServiceSelections = {
      siteName: appService.serviceName,
      subscriptionItem: subscription,
      resourceGroupItem: await AzureAuth.getResourceGroupItem(appService.resourceGroup, subscription),
      appServicePlanName: aspName,
      tier: appServicePlan.tier,
      sku: appServicePlan.name,
      linuxFxVersion: backendFrameworkLinuxVersion,
      location: appService.location,
    };

    await AzureServices.AzureAppServiceProvider.checkWebAppName(
      userAppServiceSelection.siteName,
      userAppServiceSelection.subscriptionItem
    )
      .then((invalidReason) => {
        if (invalidReason !== undefined && invalidReason === "") {
          throw new ValidationError(invalidReason);
        }
      })
      .catch((error: Error) => {
        throw error; //to log in telemetry
      });

    const result = await AzureServices.AzureAppServiceProvider.createWebApp(userAppServiceSelection, path);
    if (!result) {
      throw new Error(MESSAGES.ERRORS.APP_SERVICE_UNDEFINED_ID);
    }

    const id = AzureServices.convertId(result);
    AzureServices.updateAppServiceDeployInSettingsFile(path, id);
  }

  private static convertId(rawId: string): string {
    // workaround to convert deployment id to app service id
    const MS_RESOURCE_DEPLOYMENT = "Microsoft.Resources/deployments";
    const MS_WEB_SITE = "Microsoft.Web/sites";
    return rawId.replace(MS_RESOURCE_DEPLOYMENT, MS_WEB_SITE).replace("-" + AzureResourceType.AppService, "");
  }

  private static updateAppServiceDeployInSettingsFile(filePath: string, id: string): void {
    try {
      const settingsPath = path.join(filePath, ".vscode", "settings.json");
      if (!fse.pathExistsSync(settingsPath)) {
        fse.writeJSONSync(settingsPath, {});
      }
      const settings = fse.readJSONSync(settingsPath);
      settings["appService.deploySubpath"] = "publish";
      settings["appService.defaultWebAppToDeploy"] = id;
      fse.writeJSONSync(settingsPath, settings, { spaces: 2 });
    } catch (err) {
      throw new Error(err);
    }
  }

  public static async deployCosmos(cosmosDB: ICosmosDB, genPath: string): Promise<string> {
    const subscription = AzureServices.getSubscription(cosmosDB.subscription);

    const userCosmosDBSelection: CosmosDBSelections = {
      cosmosAPI: cosmosDB.api,
      cosmosDBResourceName: cosmosDB.serviceName,
      location: cosmosDB.location,
      resourceGroupItem: await AzureAuth.getResourceGroupItem(cosmosDB.resourceGroup, subscription),
      subscriptionItem: subscription,
    };

    await AzureServices.AzureCosmosDBProvider.validateCosmosDBAccountName(
      userCosmosDBSelection.cosmosDBResourceName,
      userCosmosDBSelection.subscriptionItem
    )
      .then((invalidReason) => {
        if (invalidReason !== undefined && invalidReason === "") {
          throw new ValidationError(invalidReason);
        }
      })
      .catch((error: Error) => {
        throw error; //to log in telemetry
      });

    const dbObject = await AzureServices.AzureCosmosDBProvider.createCosmosDB(userCosmosDBSelection, genPath);
    return dbObject.connectionString;
  }

  public static updateConnectionStringToProject(
    path: string,
    connectionString: string,
    backendFramework: string
  ): void {
    if (backendFramework === CONSTANTS.ASPNET_BACKEND_FRAMEWORK_NAME) {
      CosmosDBDeploy.updateConnectionStringInAppSettingsFile(path, connectionString);
    } else {
      CosmosDBDeploy.updateConnectionStringInEnvFile(path, connectionString);
    }
  }

  public static async updateAppSettings(
    resourceGroupName: string,
    webAppName: string,
    connectionString: string
  ): Promise<void> {
    const properties: { [s: string]: string } = {};

    if (ConnectionString.isCosmosSQLConnectionString(connectionString)) {
      const sqlData = ConnectionString.getConnectionStringSqlData(connectionString);
      properties[CONSTANTS.COSMOSDB_SQL.URI] = sqlData.origin;
      properties[CONSTANTS.COSMOSDB_SQL.PRIMARY_KEY] = sqlData.primaryKey;
    } else {
      const mongoData = ConnectionString.getConnectionStringMongoData(connectionString);
      properties[CONSTANTS.COSMOSDB_MONGO.CONNSTR] = `${mongoData.origin}/${mongoData.username}`;
      properties[CONSTANTS.COSMOSDB_MONGO.USER] = mongoData.username;
      properties[CONSTANTS.COSMOSDB_MONGO.PASSWORD] = mongoData.password;
    }

    AzureServices.AzureAppServiceProvider.updateAppSettings(resourceGroupName, webAppName, properties);
  }
}
