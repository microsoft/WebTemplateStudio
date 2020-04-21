import { ILoginToAzureAction, ILogoutAction } from "./login/model";
import { IAzureValidationStatusAction } from "./azure/model";

type AzureActionType =
  | ILoginToAzureAction
  | ILogoutAction
  | IAzureValidationStatusAction;

export default AzureActionType;
