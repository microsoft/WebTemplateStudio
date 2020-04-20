import _ from "lodash";
import { createSelector } from "reselect";
import { ServiceState } from "..";
import { AppState } from "../../combineReducers";
import { ISelectedCosmosService } from "./model";

const getServices = (state: AppState): ServiceState =>
  state.services;

const isCosmosDbSelected = (services: ServiceState): boolean => {
  return !_.isEmpty(services.cosmosDB.selection);
};
const isCosmosResourceCreatedSelector = createSelector(
  getServices,
  isCosmosDbSelected
);

const getCosmosDbOptions = (services: ServiceState, isCosmosSelected: boolean): ISelectedCosmosService | null => {
  if (isCosmosSelected) {
    return services.cosmosDB.selection;
  }
  return null;
};
const getCosmosDbSelectionSelector = createSelector(
  getServices,
  isCosmosResourceCreatedSelector,
  getCosmosDbOptions
);

export {
  getCosmosDbSelectionSelector,
  isCosmosResourceCreatedSelector
};
