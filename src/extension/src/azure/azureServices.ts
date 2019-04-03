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

export abstract class AzureServices{
  private static AzureFunctionProvider = new FunctionProvider();
  private static AzureCosmosDBProvider = new CosmosDBDeploy();
    
  private static usersCosmosDBSubscriptionItemCache: SubscriptionItem;
  private static usersFunctionSubscriptionItemCache: SubscriptionItem;

    public static async performLogin() {
      return AzureAuth.login().then(res =>{
        const email = AzureAuth.getEmail();

        const subscriptionList = AzureAuth.getSubscriptions().then(items => {
          return items.map( subscriptionItem => {
            return {
              label: subscriptionItem.label,
              value: subscriptionItem.label
            };
          });
        });
        return {
          email: email,
          subscriptions: subscriptionList
        };
      });
  }
}