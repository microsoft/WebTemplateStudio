import { ILoginToAzureAction, ILogoutAction } from "./model";

type AzureActionType =
  | ILoginToAzureAction
  | ILogoutAction

export default AzureActionType;
