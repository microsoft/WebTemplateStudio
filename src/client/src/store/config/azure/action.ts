
import { ILogoutAction, ILoginToAzureAction } from "./model";
import { AZURE_TYPEKEYS } from "./typeKeys";

export const logOutAzureAction = (): ILogoutAction => ({
  type: AZURE_TYPEKEYS.LOG_OUT_OF_AZURE
});

export const logIntoAzureActionAction = (loginData: AzureProfile): ILoginToAzureAction => ({
  type: AZURE_TYPEKEYS.LOG_IN_TO_AZURE,
  payload: loginData
});