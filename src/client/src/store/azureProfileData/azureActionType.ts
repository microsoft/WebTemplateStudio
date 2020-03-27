import { ISaveAppServiceSettingsAction, IRemoveAppServiceSettingsAction, ISetAppServiceSiteNameAvailabilityAction } from "./appService/model";
import { ISaveCosmosDbSettingsAction, IRemoveCosmosDbSettingsAction, ISetCosmosAccountNameAvailabilityAction } from "./cosmosDb/model";
import { IsLoggedIntoAzureAction, ILoginToAzureAction, ILogoutAction } from "./login/model";
import { IAzureValidationStatusAction, IGetSubscriptionAction } from "./azure/model";

type AzureActionType =
  | IsLoggedIntoAzureAction
  | ILoginToAzureAction
  | ILogoutAction
  | ISaveCosmosDbSettingsAction
  | IRemoveCosmosDbSettingsAction
  | ISaveAppServiceSettingsAction
  | IRemoveAppServiceSettingsAction
  | ISetCosmosAccountNameAvailabilityAction
  | ISetAppServiceSiteNameAvailabilityAction
  | IAzureValidationStatusAction
  | IGetSubscriptionAction;

export default AzureActionType;
