
import { ILogoutAction } from "./model";
import { AZURE_TYPEKEYS } from "../typeKeys";
import { Dispatch } from "react";
import logout from "../../../mockData/logout";

export const logOutAzureAction = (): ILogoutAction => ({
  type: AZURE_TYPEKEYS.LOG_OUT_OF_AZURE
});

export const startLogOutAzureAction = () => {
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