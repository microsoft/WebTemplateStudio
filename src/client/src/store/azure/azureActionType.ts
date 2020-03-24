import { IAzureValidationStatus } from "../../actions/azureActions/setAzureValidationStatusAction";
import { IGetSubscription } from "../../actions/azureActions/subscriptionData";
import { ISaveAppServiceSettings, IRemoveAppServiceSettings, ISetAppServiceSiteNameAvailability } from "./appService/model";
import { ISaveCosmosDbSettings, IRemoveCosmosDbSettings, ISetCosmosAccountNameAvailability } from "./cosmosDb/model";
import { IsLoggedIntoAzure, ILoginToAzure, ILogout } from "./login/model";

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
