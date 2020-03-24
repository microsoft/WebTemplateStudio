import { IsLoggedIntoAzure, ILoginToAzure } from "../../actions/azureActions/logIntoAzure";
import { ILogout } from "../../actions/azureActions/logOutAzure";
import { IAzureValidationStatus } from "../../actions/azureActions/setAzureValidationStatusAction";
import { IGetSubscription } from "../../actions/azureActions/subscriptionData";
import { ISaveAppServiceSettings, IRemoveAppServiceSettings, ISetAppServiceSiteNameAvailability } from "./appService/model";
import { ISetCosmosAccountNameAvailability } from "../../actions/azureActions/setAccountAvailability";
import { ISaveCosmosDbSettings, IRemoveCosmosDbSettings } from "./cosmosDb/model";

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
