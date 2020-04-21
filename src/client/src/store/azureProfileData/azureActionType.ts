import { ISaveAppServiceSettingsAction, IRemoveAppServiceSettingsAction } from "../userSelection/services/appService/model";
import { ISaveCosmosDbSettingsAction, IRemoveCosmosDbSettingsAction } from "../userSelection/services/cosmosDb/model";
import { ILoginToAzureAction, ILogoutAction } from "./login/model";
import { IAzureValidationStatusAction } from "./azure/model";

type AzureActionType =
  | ILoginToAzureAction
  | ILogoutAction
  | ISaveCosmosDbSettingsAction
  | IRemoveCosmosDbSettingsAction
  | ISaveAppServiceSettingsAction
  | IRemoveAppServiceSettingsAction
  | IAzureValidationStatusAction;

export default AzureActionType;
