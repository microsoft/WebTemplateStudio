import { ISaveAppServiceAction, IRemoveAppServiceAction } from "../userSelection/services/appService/model";
import { ISaveCosmosDbAction, IRemoveCosmosDbAction } from "../userSelection/services/cosmosDb/model";
import { ILoginToAzureAction, ILogoutAction } from "./login/model";
import { IAzureValidationStatusAction } from "./azure/model";

type AzureActionType =
  | ILoginToAzureAction
  | ILogoutAction
  | ISaveCosmosDbAction
  | IRemoveCosmosDbAction
  | ISaveAppServiceAction
  | IRemoveAppServiceAction
  | IAzureValidationStatusAction;

export default AzureActionType;
