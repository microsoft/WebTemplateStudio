import { IsLoggedIntoAzureAction, ILoginToAzure, ILogoutAction } from "./model";
import { AZURE_TYPEKEYS } from "../typeKeys";
import { Dispatch } from "react";
import logout from "../../../mockData/logout";

export const IsLoggedIntoAzureActionAction = (): IsLoggedIntoAzureAction => ({
  type: AZURE_TYPEKEYS.IS_LOGGED_IN_TO_AZURE
});

export const logIntoAzureActionAction = (loginData: AzureProfile): ILoginToAzure => ({
  type: AZURE_TYPEKEYS.LOG_IN_TO_AZURE,
  payload: loginData
});

export const logOutAzureAction = (): ILogoutAction => ({
  type: AZURE_TYPEKEYS.LOG_OUT_OF_AZURE
});

export const startLogOutAzure = () => {
  return async (dispatch: Dispatch<ILogoutAction>) => {
    // Can dispatch a spinner here until login completes
    try {
      const loginData = await logout();
      if (loginData.body === "success") {
        dispatch(logOutAzureAction());
      } else {
        console.log("Error signing out of Azure");
      }
    } catch (err) {
      console.log(err);
    }
  };
};