import { AZURE_TYPEKEYS } from "../../../azureProfileData/typeKeys";
import { IAppService } from "./model";
import RootAction from "../../../ActionType";
import { CONFIG_TYPEKEYS } from "../../../config/configTypeKeys";

const initialState: IAppService = {
  selection: null
};

const appServiceReducer = (
  state: IAppService = initialState,
  action: RootAction
) => {
  switch (action.type) {
    case CONFIG_TYPEKEYS.RESET_WIZARD:
    case AZURE_TYPEKEYS.LOG_OUT_OF_AZURE:
    case AZURE_TYPEKEYS.REMOVE_APP_SERVICE_SETTINGS:
      return initialState;
    case AZURE_TYPEKEYS.SAVE_APP_SERVICE_SETTINGS:
      const newUserSelectionState = {
        ...state,
        selection: {
          subscription: action.payload.subscription,
          resourceGroup: action.payload.resourceGroup,
          location: action.payload.location,
          internalName: action.payload.internalName,
          siteName: action.payload.siteName
        }
      };
      return newUserSelectionState;
    default:
      return state;
  }
};

export default appServiceReducer;