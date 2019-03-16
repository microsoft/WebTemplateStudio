import * as Actions from "../../../actions/types";
import { stat } from "fs";

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

interface IAvailability {
  isAppNameAvailable: boolean;
  message: string;
}

export interface ISelectedAzureFunctionsService {
  subscription: string;
  resourceGroup: string;
  appName: string;
  runtimeStack: string;
  location: string;
  numFunctions: number;
  functionNames?: string[];
}

interface IServiceContent {
  serviceType: string;
}

export interface IAzureFunctionsSelection {
  appNameAvailability: IAvailability;
  selection: ISelectedAzureFunctionsService[];
  wizardContent: IServiceContent;
}

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
  for (let i = 0; i < numFunctions; i++) {
    functionNames.push(`Function${i}`);
  }
  return functionNames;
}

const azureFunctions = (state: IAzureFunctionsSelection = initialState, action: any) => {
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
    case Actions.REMOVE_AZURE_FUNCTIONS_APP:
      if (state.selection[0].functionNames) {
        // the state must be deeply mutated in order to be recognized as a state change in redux
        const newFunctionApp = [...state.selection];
        newFunctionApp.splice(action.payload, 1);
        const newAppState = {
          ...state,
          selection: [...newFunctionApp]
        }
        return newAppState;
      }
      return state;
    case Actions.REMOVE_AZURE_FUNCTION:
      // hardcoding 0th index because only 1 function app can currently be added
      const newFunctionState = { ...state };
      if (newFunctionState.selection[0].functionNames) {
        newFunctionState.selection[0].functionNames.splice(action.payload, 1);
      }
      return newFunctionState;
    case Actions.SAVE_AZURE_FUNCTIONS_SETTINGS:
      const newSelectionState = {
        ...state,
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
