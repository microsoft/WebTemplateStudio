import { ISaveAppServiceSettingsAction, IRemoveAppServiceSettingsAction, ISetAppServiceSiteNameAvailabilityAction } from "./appService/model";
import { ISaveCosmosDbSettingsAction, IRemoveCosmosDbSettingsAction, ISetCosmosAccountNameAvailabilityAction } from "./cosmosDb/model";
import { ILoginToAzureAction, ILogoutAction, IIsLoggedIntoAzureAction } from "./login/model";
import { IAzureValidationStatusAction, IGetSubscriptionAction } from "./azure/model";

type AzureActionType =
  | IIsLoggedIntoAzureAction
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
