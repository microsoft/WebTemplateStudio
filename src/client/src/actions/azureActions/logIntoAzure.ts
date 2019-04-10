import { AZURE_TYPEKEYS } from "./typeKeys";

const isLoggedIntoAzureAction = () => ({
  type: AZURE_TYPEKEYS.IS_LOGGED_IN_TO_AZURE
});

const logIntoAzureAction = (loginData: any) => ({
  type: AZURE_TYPEKEYS.LOG_IN_TO_AZURE,
  payload: loginData
});

export { isLoggedIntoAzureAction, logIntoAzureAction };
