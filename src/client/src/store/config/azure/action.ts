import { ILoginToAzureAction } from "./model";
import { CONFIG_TYPEKEYS } from "../../typeKeys";

export const logIntoAzureActionAction = (loginData: AzureProfile): ILoginToAzureAction => ({
  type: CONFIG_TYPEKEYS.LOG_IN_TO_AZURE,
  payload: loginData
});