import _ from "lodash";
import { createSelector } from "reselect";
import { ISelectedCosmosService } from "../reducers/wizardSelectionReducers/services/cosmosDbReducer";
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
  previousFormData: ISelectedCosmosService;
}
const getServicesSelector = (state: AppState): object =>
  state.selection.services;
const isCosmosDbSelected = (services: any): boolean => {
  return !_.isEmpty(services.cosmosDB.selection);
};
const isCosmosResourceCreatedSelector = createSelector(
  getServicesSelector,
  isCosmosDbSelected
);
const getCosmosDbOptions = (services: any, isCosmosSelected: boolean): any => {
  if (isCosmosSelected) {
    return services.cosmosDB.selection[0];
  }
};
const getCosmosDbSelectionSelector = createSelector(
  getServicesSelector,
  isCosmosResourceCreatedSelector,
  getCosmosDbOptions
);
/**
 * Returns the CosmosDB selection made by a developer.
 * Returns undefined if a selection was not made.
 * Currently, only one Cosmos Resource can be added, hence
 * the hardcoded value of 0 index.
 *
 * @param services An object of all the services available in Web Template Studio
 */
const getCosmosSelectionInDropdownForm = (services: any): any => {
  const { selection } = services.selection.services.cosmosDB;
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
  getCosmosDbOptions,
  getCosmosSelectionInDropdownForm
);

export {
  getCosmosDbSelectionSelector,
  getFunctionsSelection,
  getCosmosSelectionInDropdownForm,
  getServicesSelector,
  isCosmosResourceCreatedSelector
};
