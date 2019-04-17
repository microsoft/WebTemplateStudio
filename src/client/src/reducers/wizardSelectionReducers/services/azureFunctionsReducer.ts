import { AZURE_TYPEKEYS } from "../../../actions/azureActions/typeKeys";
import { messages } from "../../../selectors/wizardSelectionSelector";
import { FormattedMessage } from "react-intl";
import AzureActionType from "../../../actions/azureActions/azureActionType";

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
  internalName: string;
  numFunctions: number;
  functionNames?: string[];
}

interface IServiceContent {
  serviceType: FormattedMessage.MessageDescriptor;
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
    serviceType: messages.azureFunctionsOriginalTitle
  }
};

const createFunctionNames = (numFunctions: number): string[] => {
  const functionNames = [];
  for (let i = 1; i <= numFunctions; i++) {
    functionNames.push(`function${i}`);
  }
  return functionNames;
};

const azureFunctions = (
  state: IAzureFunctionsSelection = initialState,
  action: AzureActionType
) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.UPDATE_AZURE_FUNCTION_NAMES:
      const newFunctionNamesState = { ...state };
      newFunctionNamesState.selection[action.payload.appIndex].functionNames =
        action.payload.functionNames;
      return newFunctionNamesState;

    case AZURE_TYPEKEYS.SET_APP_NAME_AVAILABILITY:
      const newAvailabilityState = {
        ...state,
        appNameAvailability: {
          isAppNameAvailable: action.payload.isAvailable,
          message: action.payload.message
        }
      };
      return newAvailabilityState;

    case AZURE_TYPEKEYS.LOG_OUT_OF_AZURE:
      return initialState;
    case AZURE_TYPEKEYS.REMOVE_AZURE_FUNCTIONS_APP:
      if (state.selection[0].functionNames) {
        // the state must be deeply mutated in order to be recognized as a state change in redux
        const newFunctionApp = [...state.selection];
        newFunctionApp.splice(action.payload, 1);
        const newAppState = {
          ...state,
          selection: [...newFunctionApp]
        };
        return newAppState;
      }
      return state;
    case AZURE_TYPEKEYS.REMOVE_AZURE_FUNCTION:
      // hardcoding 0th index because only 1 function app can currently be added
      const newFunctionState = { ...state };
      if (newFunctionState.selection[0].functionNames) {
        newFunctionState.selection[0].functionNames.splice(action.payload, 1);
        newFunctionState.selection[0].numFunctions--;
      }
      return newFunctionState;
    case AZURE_TYPEKEYS.SAVE_AZURE_FUNCTIONS_SETTINGS:
      const newSelectionState = {
        ...initialState,
        selection: [
          {
            subscription: action.payload.subscription.value,
            resourceGroup: action.payload.resourceGroup.value,
            location: action.payload.location.value,
            runtimeStack: action.payload.runtimeStack.value,
            internalName: action.payload.internalName.value,
            numFunctions: action.payload.numFunctions.value,
            functionNames: createFunctionNames(
              action.payload.numFunctions.value
            ),
            appName: action.payload.appName.value
          }
        ]
      };
      return newSelectionState;

    default:
      return state;
  }
};

export default azureFunctions;
