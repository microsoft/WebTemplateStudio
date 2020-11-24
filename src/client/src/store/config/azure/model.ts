import { AZURE_TYPEKEYS } from "./typeKeys";

export interface ILoginToAzureAction {
  type: AZURE_TYPEKEYS.LOG_IN_TO_AZURE;
  payload: AzureProfile;
}

export interface ILogoutAction {
  type: AZURE_TYPEKEYS.LOG_OUT_OF_AZURE;
}
