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
        }
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
  }
}

const createFunctionNames = (numFunctions: number): string[] => {
  const functionNames = [];
  for (let i = 1; i <= numFunctions; i++) {
    functionNames.push(`Function${i}`);
  }
  return functionNames;
}

const azureFunctions = (state: any = initialState, action: any) => {
  switch (action.type) {
    case Actions.UPDATE_AZURE_FUNCTION_NAMES:
      const newFunctionNamesState = {...state};
      newFunctionNamesState.selection[action.payload.appIndex].functionNames = action.payload.functionNames;
      return newFunctionNamesState;
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
