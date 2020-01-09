import { createSelector } from "reselect";
import { AppState } from "../reducers";
import { ServiceState } from "../reducers/wizardSelectionReducers/services";
import { isAppServiceSelectedSelector } from "./appServiceSelector";
import { isCosmosResourceCreatedSelector } from "./cosmosServiceSelector";

const getState = (state: AppState): AppState => state;

const getServicesSelector = (state: AppState): ServiceState =>
  state.selection.services;

const hasServicesSelected = (state: AppState): boolean => {
  return (
    isAppServiceSelectedSelector(state) ||
    isCosmosResourceCreatedSelector(state)
  );
};

const hasServicesSelector = createSelector(
  getState,
  hasServicesSelected
);

export { getServicesSelector, hasServicesSelector };
