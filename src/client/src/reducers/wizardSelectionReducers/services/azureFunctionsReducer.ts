import * as Actions from "../../../actions/types";

/* State Shape
{
    azureFunctions: {
        appNameAvailability: {
            isAppNameAvailable: boolean,
            message: string
        },
        selection: {}
    }
}
*/

const initialState = {
  appNameAvailability: {
      isAppNameAvailable: false,
      message: "App name unavailable"
  },
  selection: [],
  wizardContent: {
    serviceType: "Azure Functions",
    serviceName: ""
  }
}

const azureFunctions = (state: any = initialState, action: any) => {
  switch (action.type) {
    case Actions.SET_APP_NAME_AVAILABILITY:
      const newAvailabilityState = {
        ...state,
        appNameAvailability: {
          isAppNameAvailable: action.payload.isAvailable,
          message: action.payload.message
        }
      };
      return newAvailabilityState;
    case Actions.LOG_OUT_OF_AZURE:
      return initialState;
    case Actions.SAVE_AZURE_FUNCTIONS_SETTINGS:
      const newSelectionState = {
        ...initialState,
        selection: [...state.selection, action.payload],
      };
      return newSelectionState;
    default:
      return state;
  }
};

export default azureFunctions;
