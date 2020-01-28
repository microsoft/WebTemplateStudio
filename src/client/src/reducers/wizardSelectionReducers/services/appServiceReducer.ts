import { AZURE_TYPEKEYS } from "../../../actions/azureActions/typeKeys";
import messages from "../../../selectors/wizardSelectionSelector/messages";
import { FormattedMessage } from "react-intl";
import AzureActionType from "../../../actions/azureActions/azureActionType";
import { WIZARD_INFO_TYPEKEYS } from "../../../actions/wizardInfoActions/typeKeys";
import WizardInfoType from "../../../actions/wizardInfoActions/wizardInfoActionType";

export interface IAvailability {
  isSiteNameAvailable: boolean;
  message: string;
}

export interface ISelectedAppService {
  subscription: string;
  isMicrosoftLearnSubscription: boolean;
  resourceGroup: string;
  siteName: string;
  internalName: string;
}

interface IServiceContent {
  serviceType: FormattedMessage.MessageDescriptor;
}

export interface IAppService {
  siteNameAvailability: IAvailability;
  selection: ISelectedAppService | null;
  wizardContent: IServiceContent;
}

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

const appService = (
  state: IAppService = initialState,
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
          isMicrosoftLearnSubscription: action.payload.subscription.isMicrosoftLearnSubscription,
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
