import * as Actions from "../../../actions/types";

/* State Shape
{
  cosmosDB:
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

const services = (state: any = initialState, action: any) => {
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
    case Actions.LOG_OUT_OF_AZURE:
      return initialState;
    default:
      return state;
  }
};

export default services;
