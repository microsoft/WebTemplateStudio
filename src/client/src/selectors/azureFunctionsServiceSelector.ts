import _ from "lodash";
import { createSelector } from "reselect";
import { ISelectedAzureFunctionsService } from "../reducers/wizardSelectionReducers/services/azureFunctionsReducer";
import { AppState } from "../reducers";

interface ISelectedDropdowns {
  subscription?: IDropDownOptionType;
  resourceGroup?: IDropDownOptionType;
  appName?: IDropDownOptionType;
  runtimeStack?: IDropDownOptionType;
  location?: IDropDownOptionType;
  numFunctions?: IDropDownOptionType;
}

interface ISelectionInformation {
  dropdownSelection: ISelectedDropdowns;
  previousFormData: ISelectedAzureFunctionsService;
}

const getState = (state: AppState): AppState => state;
const getServicesSelector = (state: AppState) => state.selection.services;

const isAzureFunctionsSelected = (state: AppState): boolean => {
  return !_.isEmpty(state.selection.services.azureFunctions.selection);
};

const isAzureFunctionsSelectedSelector = createSelector(
  getState,
  isAzureFunctionsSelected
);

const getAzureFunctionsOptions = (
  state: AppState,
  isAzureFunctionsSelected: boolean
): any => {
  if (isAzureFunctionsSelected) {
    let selections = state.selection.services.azureFunctions.selection[0];
    let updatedSelections;
    if (selections.functionNames) {
      updatedSelections = {
        ...selections,
        functionNames: selections.functionNames.map(functionNameObject => {
          return functionNameObject.title;
        })
      };
    } else {
      updatedSelections = selections;
    }
    return updatedSelections;
  }
};
const getAzureFunctionsOptionsSelector = createSelector(
  getState,
  isAzureFunctionsSelected,
  getAzureFunctionsOptions
);

/**
 * Returns the Azure Functions selection made by a developer.
 * Returns undefined if a selection was not made.
 * Currently, only one Azure Functions App can be added, hence
 * the hardcoded value of 0 index.
 *
 * @param services
 * @param isAzureFunctionsSelected
 */
const getAzureFunctionsSelectionInDropdownForm = (services: any): any => {
  const { selection } = services.azureFunctions;
  if (!_.isEmpty(selection)) {
    const selectionInformation: ISelectionInformation = {
      dropdownSelection: {},
      previousFormData: selection[0]
    };
    for (const selectionKey in selection[0]) {
      if (selectionKey) {
        // @ts-ignore to allow dynamic key selection
        selectionInformation.dropdownSelection[selectionKey] = {
          value: selection[0][selectionKey],
          label: selection[0][selectionKey]
        };
      }
    }
    return selectionInformation;
  }
};

const getFunctionsSelection = createSelector(
  getServicesSelector,
  getAzureFunctionsSelectionInDropdownForm
);

export {
  getFunctionsSelection,
  getAzureFunctionsOptionsSelector,
  isAzureFunctionsSelectedSelector
};
