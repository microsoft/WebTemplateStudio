import * as Actions from "../../../actions/types";

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

interface IAvailability {
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
  serviceType: string;
}

export interface ICosmosDB {
  accountNameAvailability: IAvailability;
  selection: ISelectedCosmosService[];
  wizardContent: IServiceContent;
}

const initialState = {
  accountNameAvailability: {
      isAccountNameAvailable: false,
      message: "Account name unavailable"
  },
  selection: [],
  wizardContent: {
    serviceType: "CosmosDB",
  }
}

const services = (state: ICosmosDB = initialState, action: any) => {
  switch (action.type) {
    case Actions.SAVE_COSMOS_DB_RESOURCE_SETTINGS:
      const newSelectionState = {
        ...initialState,
        selection: [
          ...state.selection,
          action.payload,
        ],
      };
      return newSelectionState;
    case Actions.SET_ACCOUNT_AVAILABILITY:
      const newAvailabilityState = {
        ...state,
        accountNameAvailability: {
          isAccountNameAvailable: action.payload.isAvailable,
          message: action.payload.message
        }
      };
      return newAvailabilityState;
    case Actions.REMOVE_COSMOS_RESOURCE:
      const { selection } = state;
      const selectionIndex = action.payload;
      const newSelection = selection.slice(0, selectionIndex).concat(selection.slice(selectionIndex + 1, selection.length));
      return {
        ...state,
        selection: newSelection
      };
    case Actions.LOG_OUT_OF_AZURE:
      return initialState;
    default:
      return state;
  }
};

export default services;
