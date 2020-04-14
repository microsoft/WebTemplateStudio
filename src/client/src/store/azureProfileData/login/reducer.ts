import { AZURE_TYPEKEYS } from "../typeKeys";
import AzureActionType from "../azureActionType";
import { CONFIG_TYPEKEYS } from "../../typeKeys";

export const isLoggedIn = (state = false, action: AzureActionType) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.LOG_OUT_OF_AZURE:
      return false;
    case AZURE_TYPEKEYS.LOG_IN_TO_AZURE:
      return true;
    case AZURE_TYPEKEYS.IS_LOGGED_IN_TO_AZURE:
    default:
      return state;
  }
};
