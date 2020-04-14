import { AZURE_TYPEKEYS } from "../typeKeys";
import messages from "../../userSelection/app/wizardSelectionSelector/messages";
import { IAppService } from "./model";
import RootAction from "../../ActionType";
import { CONFIG_TYPEKEYS } from "../../config/configTypeKeys";

const initialState: IAppService = {
  siteNameAvailability: {
    isSiteNameAvailable: false,
    message: "App name unavailable"
  },
  selection: null,
  wizardContent: {
    serviceType: messages.appServiceOriginalTitle
  }
};

const appServiceReducer = (
  state: IAppService = initialState,
  action: RootAction
) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.SET_APP_NAME_AVAILABILITY:
      const newAvailabilityState = {
        ...state,
        siteNameAvailability: {
          isSiteNameAvailable: action.payload.isAvailable,
          message: action.payload.message
        }
      };
      return newAvailabilityState;
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