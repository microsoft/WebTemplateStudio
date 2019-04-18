import { AZURE_TYPEKEYS } from "./typeKeys";
import logout from "../../mockData/logout";
import { Dispatch } from "react";

export interface ILogout {
  type: AZURE_TYPEKEYS.LOG_OUT_OF_AZURE;
}

const logOutAzureAction = (): ILogout => ({
  type: AZURE_TYPEKEYS.LOG_OUT_OF_AZURE
});

const startLogOutAzure = () => {
  return async (dispatch: Dispatch<ILogout>) => {
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

export { startLogOutAzure };
