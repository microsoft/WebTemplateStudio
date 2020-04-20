import { MICROSOFT_LEARN_TENANTS } from "./../configuration.json";

import { AzureAuth, SubscriptionItem, LocationItem } from "./azure-auth/azureAuth";
import { CosmosDBDeploy, CosmosDBSelections } from "./azure-cosmosDB/cosmosDbModule";
import { CONSTANTS, AzureResourceType} from "../constants";
import { SubscriptionError, ValidationError } from "../errors";
import { ResourceGroupDeploy, ResourceGroupSelection } from "./azure-resource-group/resourceGroupModule";
import { AppServiceProvider, AppServiceSelections } from "./azure-app-service/appServiceProvider";
import { StringDictionary } from "azure-arm-website/lib/models";
import { ConnectionString } from "./utils/connectionString";
import { Settings } from "./utils/settings";

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

  public static async Login(): Promise<boolean>{
    return await AzureAuth.login();
  }

  public static async Logout(): Promise<boolean>{
    const success = await AzureAuth.logout();
    AzureServices.CleanSubscriptionCache();
    return success;
  }

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

  private static CleanSubscriptionCache(): void {
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

  public static async getResourceGroups(subscriptionName: string): Promise<ResourceGroup[]> {
    const subscription = AzureServices.getSubscription(subscriptionName);
    const items = await AzureAuth.getAllResourceGroupItems(subscription);
    const resources: ResourceGroup[] = [];
    items.map(item => resources.push({ name: item.name }));
    return resources;
  }

  public static async getLocations(subscriptionName: string, azureServiceType: AzureResourceType): Promise<AzureLocation[]> {
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
    items.map(item => locations.push({ name: item.locationDisplayName }));
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

  public static async getResourceGroupSelections(payload: any): Promise<ResourceGroupSelection[]> {
    const selection: ResourceGroupSelection[] = [];

    if (payload.appService) {
      const canCreateResourceGroup = await AzureServices.canCreateResourceGroup(payload.appService, selection);
      if (canCreateResourceGroup) {
        const resourceGroupSelection = await AzureServices.getResourceGroupSelection(payload.appService);
        selection.push(resourceGroupSelection);
      }
    }

    if (payload.cosmos) {
      const canCreateResourceGroup = await AzureServices.canCreateResourceGroup(payload.cosmos, selection);
      if (canCreateResourceGroup) {
        const resourceGroupSelection = await AzureServices.getResourceGroupSelection(payload.cosmos);
        selection.push(resourceGroupSelection);
      }
    }

    return selection;
  }

  private static async canCreateResourceGroup(
    azureService: any,
    selection: ResourceGroupSelection[]
  ): Promise<boolean> {
    const { subscription, resourceGroup } = azureService;
    const subscriptionItem = AzureServices.getSubscription(subscription);
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

  private static async getResourceGroupSelection(azureService: any): Promise<ResourceGroupSelection> {
    const { subscription, resourceGroup } = azureService;
    const subscriptionItem = AzureServices.getSubscription(subscription);

    return {
      subscriptionItem,
      resourceGroupName: resourceGroup,
      location: CONSTANTS.AZURE_LOCATION.CENTRAL_US,
    };
  }

  public static async generateValidResourceGroupName(payload: any): Promise<string> {
    const subscriptions: SubscriptionItem[] = [];
    const projectName = payload.engine.projectName;

    if (payload.cosmos) {
      const cosmosSubscription = AzureServices.getSubscription(payload.cosmos.subscription);
      subscriptions.push(cosmosSubscription);
    }

    if (payload.appService) {
      const appserviceSubscription = AzureServices.getSubscription(payload.appService.subscription);
      subscriptions.push(appserviceSubscription);
    }
    const allSubscriptions: SubscriptionItem[] = [...new Set(subscriptions)];

    return await AzureServices.AzureResourceGroupProvider.generateValidResourceGroupName(
      projectName,
      allSubscriptions
    );
  }

  public static async deployResourceGroup(resourceGroupSelection: ResourceGroupSelection): Promise<void> {
    const name = resourceGroupSelection.resourceGroupName;
    const subscription = resourceGroupSelection.subscriptionItem;
    const resourceGroup = await AzureServices.AzureResourceGroupProvider.GetResourceGroup(name, subscription);

    if (!resourceGroup) {
      await AzureServices.AzureResourceGroupProvider.createResourceGroup(resourceGroupSelection);
    }
  }

  public static async deployAppService(payload: any): Promise<void> {
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
      location: payload.appService.location,
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

    const id = AzureServices.convertId(result);    
    Settings.enableScmDoBuildDuringDeploy(payload.engine.path);
    Settings.setDeployDefault(id, payload.engine.path);
  }

  private static convertId(rawId: string): string {
    // workaround to convert deployment id to app service id
    const MS_RESOURCE_DEPLOYMENT = "Microsoft.Resources/deployments";
    const MS_WEB_SITE = "Microsoft.Web/sites";
    return rawId.replace(MS_RESOURCE_DEPLOYMENT, MS_WEB_SITE).replace("-" + AzureResourceType.AppService, "");
  }

  public static async deployCosmos(selections: any, genPath: string): Promise<string> {
    const subscription = AzureServices.getSubscription(selections.subscription);

    const userCosmosDBSelection: CosmosDBSelections = {
      cosmosAPI: selections.api,
      cosmosDBResourceName: selections.accountName,
      location: selections.location,
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

    const dbObject = await AzureServices.AzureCosmosDBProvider.createCosmosDB(userCosmosDBSelection, genPath);
    return dbObject.connectionString;
  }

  public static updateConnectionStringInEnvFile(path: string, connectionString: string): void {    
    CosmosDBDeploy.updateConnectionStringInEnvFile(path, connectionString);
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
