import { AZURE_TYPEKEYS } from "../typeKeys";
import messages from "../../userSelection/app/wizardSelectionSelector/messages";
import AzureActionType from "../azureActionType";
import { ICosmosDB } from "./model";

const initialState = {
  accountNameAvailability: {
    isAccountNameAvailable: false,
    message: "Account name unavailable"
  },
  selection: [],
  wizardContent: {
    serviceType: messages.cosmosOriginalTitle
  }
};

const services = (state: ICosmosDB = initialState, action: AzureActionType) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.REMOVE_COSMOS_RESOURCE:
      const cosmosSelections = [...state.selection];
      cosmosSelections.splice(action.payload, 1);
      return {
        ...state,
        selection: cosmosSelections
      };
    case AZURE_TYPEKEYS.LOG_OUT_OF_AZURE:
      return initialState;
    case AZURE_TYPEKEYS.SAVE_COSMOS_DB_RESOURCE_SETTINGS:
      const newUserSelectionState = {
        ...state,
        selection: [
          {
            subscription: action.payload.subscription,
            resourceGroup: action.payload.resourceGroup,
            location: action.payload.location,
            api: action.payload.api,
            accountName: action.payload.accountName,
            internalName: action.payload.internalName
          }
        ]
      };
      return newUserSelectionState;
    case AZURE_TYPEKEYS.SET_ACCOUNT_AVAILABILITY:
      const newAvailabilityState = {
        ...state,
        accountNameAvailability: {
          isAccountNameAvailable: action.payload.isAvailable,
          message: action.payload.message
        }
      };
      return newAvailabilityState;
    default:
      return state;
  }
};

export default services;
