import { ILoginToAzureAction } from "./model";
import { AZURE_TYPEKEYS } from "../../azureProfileData/typeKeys";

export const logIntoAzureActionAction = (loginData: AzureProfile): ILoginToAzureAction => ({
  type: AZURE_TYPEKEYS.LOG_IN_TO_AZURE,
  payload: loginData
});