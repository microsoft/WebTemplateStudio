import { AZURE_TYPEKEYS } from "./typeKeys";
import login from "../../mockData/login";
import { Dispatch } from "react";

export interface IsLoggedIntoAzure {
  type: AZURE_TYPEKEYS.IS_LOGGED_IN_TO_AZURE;
}

export interface ILoginToAzure {
  type: AZURE_TYPEKEYS.LOG_IN_TO_AZURE;
  payload: any;
}

const isLoggedIntoAzureAction = (): IsLoggedIntoAzure => ({
  type: AZURE_TYPEKEYS.IS_LOGGED_IN_TO_AZURE
});

const logIntoAzureAction = (loginData: any): ILoginToAzure => ({
  type: AZURE_TYPEKEYS.LOG_IN_TO_AZURE,
  payload: loginData
});

const startLoginToAzure = () => {
  return async (dispatch: Dispatch<ILoginToAzure>) => {
    // Can dispatch a spinner here until login completes
    try {
      const loginData = await login();
      dispatch(logIntoAzureAction(loginData));
    } catch (err) {
      console.log(err);
    }
  };
};

export { isLoggedIntoAzureAction, logIntoAzureAction, startLoginToAzure };
