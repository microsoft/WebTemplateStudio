import { createSelector } from "reselect";
import { AppState } from "../store/combineReducers";
import { ServiceState } from "../store/azureProfileData";
import { isAppServiceSelectedSelector } from "../store/azureProfileData/appService/appServiceSelector";
import { isCosmosResourceCreatedSelector } from "../store/azureProfileData/cosmosDb/cosmosServiceSelector";

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
