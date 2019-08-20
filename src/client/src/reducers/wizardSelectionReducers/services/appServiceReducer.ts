import { AZURE_TYPEKEYS } from "../../../actions/azureActions/typeKeys";
import { messages } from "../../../selectors/wizardSelectionSelector";
import { FormattedMessage } from "react-intl";
import AzureActionType from "../../../actions/azureActions/azureActionType";
import { WIZARD_INFO_TYPEKEYS } from "../../../actions/wizardInfoActions/typeKeys";
import WizardInfoType from "../../../actions/wizardInfoActions/wizardInfoActionType";

/* State Shape
{
    appService: {
        siteNameAvailability: {
          isSiteNameAvailable: boolean,
          message: string
        },
        selection: ISelectedAppService | null,
        wizardContent: {
          serviceType: string,
        }
    }
}
*/

export interface IAvailability {
  isSiteNameAvailable: boolean;
  message: string;
}

export interface ISelectedAppService {
  subscription: string;
  resourceGroup: string;
  siteName: string;
  internalName: string;
}

interface IServiceContent {
  serviceType: FormattedMessage.MessageDescriptor;
}

export interface IAppServiceSelection {
  siteNameAvailability: IAvailability;
  selection: ISelectedAppService | null;
  wizardContent: IServiceContent;
}

const initialState: IAppServiceSelection = {
  siteNameAvailability: {
    isSiteNameAvailable: false,
    message: "App name unavailable"
  },
  selection: null,
  wizardContent: {
    serviceType: messages.appServiceOriginalTitle
  }
};

const appService = (
  state: IAppServiceSelection = initialState,
  action: AzureActionType | WizardInfoType
) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.SET_SITE_NAME_AVAILABILITY:
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
          subscription: action.payload.subscription.value,
          resourceGroup: action.payload.resourceGroup.value,
          internalName: action.payload.internalName.value,
          siteName: action.payload.siteName.value
        }
      };
      return newSelectionState;
    default:
      return state;
  }
};

export default appService;
