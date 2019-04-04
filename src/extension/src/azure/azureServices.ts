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
import { SubscriptionError } from "../errors";

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
    let subscriptionItem = await this.subscriptionItemList.find(subscriptionItem => subscriptionItem.label === subscriptionLabel);
    if(subscriptionItem === undefined){
      throw new SubscriptionError(CONSTANTS.ERRORS.SUBSCRIPTION_NOT_FOUND);
    }
    let resourceGroupItems = AzureAuth.getResourceGroupItems(subscriptionItem).then(
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
  
}
