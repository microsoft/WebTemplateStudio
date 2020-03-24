import { IGetSubscription } from "../../actions/azureActions/subscriptionData";
import { ISaveAppServiceSettings, IRemoveAppServiceSettings, ISetAppServiceSiteNameAvailability } from "./appService/model";
import { ISaveCosmosDbSettings, IRemoveCosmosDbSettings, ISetCosmosAccountNameAvailability } from "./cosmosDb/model";
import { IsLoggedIntoAzure, ILoginToAzure, ILogout } from "./login/model";
import { IAzureValidationStatus } from "./azure/model";

type AzureActionType =
  | IsLoggedIntoAzure
  | ILoginToAzure
  | ILogout
  | ISaveCosmosDbSettings
  | IRemoveCosmosDbSettings
  | ISaveAppServiceSettings
  | IRemoveAppServiceSettings
  | ISetCosmosAccountNameAvailability
  | ISetAppServiceSiteNameAvailability
  | IAzureValidationStatus
  | IGetSubscription;

export default AzureActionType;
