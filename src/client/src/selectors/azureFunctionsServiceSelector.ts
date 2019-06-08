import _ from "lodash";
import { createSelector } from "reselect";
import { ISelectedAzureFunctionsService } from "../reducers/wizardSelectionReducers/services/azureFunctionsReducer";
import { AppState } from "../reducers";
import { ServiceState } from "../reducers/wizardSelectionReducers/services/index";

interface ISelectedDropdowns {
  [key: string]: IDropDownOptionType | undefined;
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
const getServicesSelector = (state: AppState): ServiceState =>
  state.selection.services;

const getAzureFunctionsNamesSelector = (state: AppState) => {
  if (state.selection.services.azureFunctions.selection[0]) {
    return state.selection.services.azureFunctions.selection[0].functionNames;
  }
};

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
        functionNames: selections.functionNames.map(functionNameObject => {
          return functionNameObject.title;
        }),
        appName: selections.appName.value,
        internalName: selections.internalName.value,
        location: selections.location.value,
        numFunctions: selections.numFunctions.value,
        resourceGroup: selections.resourceGroup.value,
        runtimeStack: selections.runtimeStack.value,
        subscription: selections.subscription.value
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
const getAzureFunctionsSelectionInDropdownForm = (
  services: ServiceState
): any => {
  const { selection } = services.azureFunctions;
  if (!_.isEmpty(selection)) {
    const selectionInformation: ISelectionInformation = {
      dropdownSelection: {},
      previousFormData: selection[0]
    };
    for (const selectionKey in selectionInformation.previousFormData) {
      let selectionInfo = selectionInformation.previousFormData[
        selectionKey
      ] as IDropDownOptionType;
      if (selectionKey) {
        selectionInformation.dropdownSelection[selectionKey] = {
          value: selectionInfo.value,
          label: selectionInfo.label
        } as IDropDownOptionType;
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
  isAzureFunctionsSelectedSelector,
  getAzureFunctionsNamesSelector
};
