import _ from "lodash";
import { createSelector } from "reselect";
import { ISelectedCosmosService } from "../reducers/wizardSelectionReducers/services/cosmosDbReducer";
import { AppState } from "../reducers";
import { ServiceState } from "../reducers/wizardSelectionReducers/services";

interface ISelectedDropdowns {
  subscription?: IDropDownOptionType;
  resourceGroup?: IDropDownOptionType;
  appName?: IDropDownOptionType;
  runtimeStack?: IDropDownOptionType;
  location?: IDropDownOptionType;
}

interface ISelectionInformation {
  dropdownSelection: ISelectedDropdowns;
  previousFormData: ISelectedCosmosService;
}

const getServices = (state: AppState): ServiceState =>
  state.selection.services;
  
const isCosmosDbSelected = (services: any): boolean => {
  return !_.isEmpty(services.cosmosDB.selection);
};
const isCosmosResourceCreatedSelector = createSelector(
  getServices,
  isCosmosDbSelected
);
const getCosmosDbOptions = (services: any, isCosmosSelected: boolean): any => {
  if (isCosmosSelected) {
    return services.cosmosDB.selection[0];
  }
};
const getCosmosDbSelectionSelector = createSelector(
  getServices,
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
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

export {
  getCosmosDbSelectionSelector,
  getCosmosSelectionInDropdownForm,
  isCosmosResourceCreatedSelector
};
