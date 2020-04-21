import { createSelector } from "reselect";
import { AppState } from "../../combineReducers";
import { ServiceState } from "./combineReducers";
import { isAppServiceSelectedSelector } from "../../azureProfileData/appService/selector";
import { isCosmosResourceCreatedSelector } from "../../azureProfileData/cosmosDb/selector";

const getState = (state: AppState): AppState => state;

const getServicesSelector = (state: AppState): ServiceState =>
  state.userSelection.services;

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
