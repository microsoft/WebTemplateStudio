import * as Actions from "./types";

import logout from "../mockData/logout";

const logOutAzureAction = () => ({
  type: Actions.LOG_OUT_OF_AZURE
});

const startLogOutAzure = () => {
  return async (dispatch: any) => {
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
