import { AZURE_TYPEKEYS } from "../../../actions/azureActions/typeKeys";
import { FormattedMessage } from "react-intl";
import { messages } from "../../../selectors/wizardSelectionSelector";
import AzureActionType from "../../../actions/azureActions/azureActionType";

/* State Shape
{
  cosmosDB: {
    appNameAvailability: {
        isAppNameAvailable: boolean,
        message: string
    },
    selection: [],
    wizardContent: {
      serviceType: string,
    }
  }
}
*/

export interface IAvailability {
  isAccountNameAvailable: boolean;
  message: string;
}

export interface ISelectedCosmosService {
  subscription: string;
  resourceGroup: string;
  accountName: string;
  api: string;
  location: string;
  internalName: string;
}

interface IServiceContent {
  serviceType: FormattedMessage.MessageDescriptor;
}

export interface ICosmosDB {
  accountNameAvailability: IAvailability;
  selection: ISelectedCosmosService[];
  wizardContent: IServiceContent;
  chooseExistingRadioButtonSelected: boolean;
}

const initialState = {
  accountNameAvailability: {
    isAccountNameAvailable: false,
    message: "Account name unavailable"
  },
  selection: [],
  wizardContent: {
    serviceType: messages.cosmosOriginalTitle
  },
  chooseExistingRadioButtonSelected: true
};

const services = (state: ICosmosDB = initialState, action: AzureActionType) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.SAVE_COSMOS_DB_RESOURCE_SETTINGS:
      const newSelectionState = {
        ...initialState,
        selection: [
          {
            subscription: action.payload.subscription.value,
            resourceGroup: action.payload.resourceGroup.value,
            location: action.payload.location.value,
            api: action.payload.api.value,
            accountName: action.payload.accountName.value,
            internalName: action.payload.internalName.value
          }
        ],
        chooseExistingRadioButtonSelected:
          action.payload.chooseExistingRadioButtonSelected
      };
      return newSelectionState;
    case AZURE_TYPEKEYS.SET_ACCOUNT_AVAILABILITY:
      const newAvailabilityState = {
        ...state,
        accountNameAvailability: {
          isAccountNameAvailable: action.payload.isAvailable,
          message: action.payload.message
        }
      };
      return newAvailabilityState;
    case AZURE_TYPEKEYS.REMOVE_COSMOS_RESOURCE:
      const cosmosSelections = [...state.selection];
      cosmosSelections.splice(action.payload, 1);
      return {
        ...state,
        selection: cosmosSelections
      };
    case AZURE_TYPEKEYS.LOG_OUT_OF_AZURE:
      return initialState;
    default:
      return state;
  }
};

export default services;
