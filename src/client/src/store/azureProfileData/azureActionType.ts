import { ISaveAppServiceSettingsAction, IRemoveAppServiceSettingsAction, ISetAppServiceSiteNameAvailabilityAction } from "./appService/model";
import { ISaveCosmosDbSettings, IRemoveCosmosDbSettings, ISetCosmosAccountNameAvailability } from "./cosmosDb/model";
import { IsLoggedIntoAzure, ILoginToAzure, ILogout } from "./login/model";
import { IAzureValidationStatus, IGetSubscription } from "./azure/model";

type AzureActionType =
  | IsLoggedIntoAzure
  | ILoginToAzure
  | ILogout
  | ISaveCosmosDbSettings
  | IRemoveCosmosDbSettings
  | ISaveAppServiceSettingsAction
  | IRemoveAppServiceSettingsAction
  | ISetCosmosAccountNameAvailability
  | ISetAppServiceSiteNameAvailabilityAction
  | IAzureValidationStatus
  | IGetSubscription;

export default AzureActionType;
