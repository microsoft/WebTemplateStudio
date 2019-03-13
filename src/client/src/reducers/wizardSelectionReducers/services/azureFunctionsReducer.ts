import * as Actions from "../../../actions/types";

/* State Shape
{
    azureFunctions: {
        appNameAvailability: {
            isAppNameAvailable: boolean,
            message: string
        },
        selection: [],
        wizardContent: {
          serviceType: string,
          serviceName: string
        }
    }
}
*/

const initialState = {
  appNameAvailability: {
      isAppNameAvailable: false,
      message: "App name unavailable"
  },
  selection: [{
    appName: "testAppName",
    functionNames: ["function1", "function2"]
  }],
  wizardContent: {
    serviceType: "Azure Functions",
    serviceName: ""
  }
}

const createFunctionNames = (numFunctions: number): string[] => {
  const functionNames = [];
  for (let i = 1; i <= numFunctions; i++) {
    functionNames.push(`function${i}`);
  }
  return functionNames;
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
        selection: [
          ...state.selection,
          {
            ...action.payload,
            functionNames: createFunctionNames(action.payload.numFunctions)
          }
        ],
      };
      return newSelectionState;
    default:
      return state;
  }
};

export default azureFunctions;
