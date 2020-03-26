import { ISaveAppServiceSettingsAction, IRemoveAppServiceSettingsAction, ISetAppServiceSiteNameAvailabilityAction } from "./appService/model";
import { ISaveCosmosDbSettingsAction, IRemoveCosmosDbSettingsAction, ISetCosmosAccountNameAvailabilityAction } from "./cosmosDb/model";
import { IsLoggedIntoAzure, ILoginToAzure, ILogout } from "./login/model";
import { IAzureValidationStatusAction, IGetSubscriptionAction } from "./azure/model";

type AzureActionType =
  | IsLoggedIntoAzure
  | ILoginToAzure
  | ILogout
  | ISaveCosmosDbSettingsAction
  | IRemoveCosmosDbSettingsAction
  | ISaveAppServiceSettingsAction
  | IRemoveAppServiceSettingsAction
  | ISetCosmosAccountNameAvailabilityAction
  | ISetAppServiceSiteNameAvailabilityAction
  | IAzureValidationStatusAction
  | IGetSubscriptionAction;

export default AzureActionType;
