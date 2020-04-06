import { AZURE_TYPEKEYS } from "../typeKeys";
import messages from "../../selection/app/wizardSelectionSelector/messages";
import AzureActionType from "../azureActionType";
import { WIZARD_INFO_TYPEKEYS } from "../../typeKeys";
import WizardInfoType from "../../templates/wizardInfoActionType";
import { IAppService } from "./model";

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
  action: AzureActionType | WizardInfoType
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
    case WIZARD_INFO_TYPEKEYS.RESET_WIZARD:
    case AZURE_TYPEKEYS.LOG_OUT_OF_AZURE:
    case AZURE_TYPEKEYS.REMOVE_APP_SERVICE_SETTINGS:
      return initialState;
    case AZURE_TYPEKEYS.SAVE_APP_SERVICE_SETTINGS:
      const newSelectionState = {
        ...state,
        selection: {
          subscription: action.payload.subscription,
          resourceGroup: action.payload.resourceGroup,
          internalName: action.payload.internalName,
          siteName: action.payload.siteName
        }
      };
      return newSelectionState;
    default:
      return state;
  }
};

export default appServiceReducer;
