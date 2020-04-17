import { ISaveAppServiceSettingsAction, IRemoveAppServiceSettingsAction, ISetAppServiceSiteNameAvailabilityAction } from "./appService/model";
import { ISaveCosmosDbSettingsAction, IRemoveCosmosDbSettingsAction, ISetCosmosAccountNameAvailabilityAction } from "./cosmosDb/model";
import { ILoginToAzureAction, ILogoutAction } from "./login/model";
import { IAzureValidationStatusAction } from "./azure/model";

type AzureActionType =
  | ILoginToAzureAction
  | ILogoutAction
  | ISaveCosmosDbSettingsAction
  | IRemoveCosmosDbSettingsAction
  | ISaveAppServiceSettingsAction
  | IRemoveAppServiceSettingsAction
  | ISetCosmosAccountNameAvailabilityAction
  | ISetAppServiceSiteNameAvailabilityAction
  | IAzureValidationStatusAction;

export default AzureActionType;
