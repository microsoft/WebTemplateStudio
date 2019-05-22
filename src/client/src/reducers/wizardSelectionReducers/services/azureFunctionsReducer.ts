import { AZURE_TYPEKEYS } from "../../../actions/azureActions/typeKeys";
import { messages } from "../../../selectors/wizardSelectionSelector";
import { FormattedMessage } from "react-intl";
import AzureActionType from "../../../actions/azureActions/azureActionType";
import { WIZARD_INFO_TYPEKEYS } from "../../../actions/wizardInfoActions/typeKeys";
import WizardInfoType from "../../../actions/wizardInfoActions/wizardInfoActionType";
import { IFunctionName } from "../../../containers/AzureFunctionsSelection";

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
  [key: string]: IDropDownOptionType | IFunctionName[] | undefined;
  subscription: IDropDownOptionType;
  resourceGroup: IDropDownOptionType;
  appName: IDropDownOptionType;
  runtimeStack: IDropDownOptionType;
  location: IDropDownOptionType;
  internalName: IDropDownOptionType;
  numFunctions: IDropDownOptionType;
  functionNames?: IFunctionName[];
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

const getFunctionNames = (functionNames: IFunctionName[]): string[] => {
  const names: string[] = [];
  functionNames.forEach((functionName: IFunctionName) => {
    names.push(functionName.title);
  });
  return names;
};

const createFunctionNames = (
  numFunctions: number,
  prevFunctionNames?: IFunctionName[]
): IFunctionName[] => {
  if (prevFunctionNames) {
    if (prevFunctionNames.length >= numFunctions) {
      const numFunctionsToDelete = prevFunctionNames.length - numFunctions;
      const startIndex = prevFunctionNames.length - numFunctionsToDelete;
      prevFunctionNames.splice(startIndex, numFunctionsToDelete);
    } else {
      const numFunctionsToCreate = numFunctions - prevFunctionNames.length;
      let lastNumberUsed = 1;
      for (let i = 1; i <= numFunctionsToCreate; i++) {
        let title = `function${lastNumberUsed}`;
        while (getFunctionNames(prevFunctionNames).includes(title)) {
          lastNumberUsed++;
          title = `function${lastNumberUsed}`;
        }
        prevFunctionNames.push({
          title,
          isValidTitle: true,
          error: "",
          id: title
        });
      }
    }
    return [...prevFunctionNames];
  }
  const functionNames: IFunctionName[] = [];
  for (let i = 1; i <= numFunctions; i++) {
    const title = `function${i}`;
    functionNames.push({
      title,
      isValidTitle: true,
      error: "",
      id: title
    });
  }
  return functionNames;
};

const azureFunctions = (
  state: IAzureFunctionsSelection = initialState,
  action: AzureActionType | WizardInfoType
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
    case WIZARD_INFO_TYPEKEYS.RESET_WIZARD:
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
      const { functionNames } = newFunctionState.selection[0];
      if (functionNames) {
        functionNames.splice(action.payload, 1);
        newFunctionState.selection[0].functionNames = functionNames;
        newFunctionState.selection[0].numFunctions = {
          label: functionNames.length,
          value: functionNames.length
        };
      }
      return newFunctionState;
    case AZURE_TYPEKEYS.SAVE_AZURE_FUNCTIONS_SETTINGS:
      const newSelectionState = {
        ...initialState,
        selection: [
          {
            subscription: action.payload.subscription,
            resourceGroup: action.payload.resourceGroup,
            location: action.payload.location,
            runtimeStack: action.payload.runtimeStack,
            internalName: action.payload.internalName,
            numFunctions: action.payload.numFunctions,
            functionNames: createFunctionNames(
              action.payload.numFunctions.value,
              state.selection[0] ? state.selection[0].functionNames : undefined
            ),
            appName: action.payload.appName
          }
        ]
      };
      return newSelectionState;

    default:
      return state;
  }
};

export default azureFunctions;
