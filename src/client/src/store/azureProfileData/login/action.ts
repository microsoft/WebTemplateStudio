
import { IsLoggedIntoAzureAction, ILogoutAction, ILoginToAzureAction } from "./model";
import { AZURE_TYPEKEYS } from "../typeKeys";
import { CONFIG_TYPEKEYS } from "../../typeKeys";

export const IsLoggedIntoAzureActionAction = (): IsLoggedIntoAzureAction => ({
  type: AZURE_TYPEKEYS.IS_LOGGED_IN_TO_AZURE
});

export const logOutAzureAction = (): ILogoutAction => ({
  type: AZURE_TYPEKEYS.LOG_OUT_OF_AZURE
});

export const logIntoAzureActionAction = (loginData: AzureProfile): ILoginToAzureAction => ({
  type: CONFIG_TYPEKEYS.LOG_IN_TO_AZURE,
  payload: loginData
});