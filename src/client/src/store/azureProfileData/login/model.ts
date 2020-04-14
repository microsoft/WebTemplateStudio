import { AZURE_TYPEKEYS } from "../typeKeys";

export interface IIsLoggedIntoAzureAction {
  type: AZURE_TYPEKEYS.IS_LOGGED_IN_TO_AZURE;
}

export interface ILoginToAzureAction {
  type: AZURE_TYPEKEYS.LOG_IN_TO_AZURE;
  payload: AzureProfile;
}

export interface ILogoutAction {
  type: AZURE_TYPEKEYS.LOG_OUT_OF_AZURE;
}