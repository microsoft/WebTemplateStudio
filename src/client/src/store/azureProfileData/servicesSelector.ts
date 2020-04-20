import { createSelector } from "reselect";
import { AppState } from "../combineReducers";
import { ServiceState } from ".";
import { isAppServiceSelectedSelector } from "./appService/selector";
import { isCosmosResourceCreatedSelector } from "./cosmosDb/selector";

const getState = (state: AppState): AppState => state;

const getServicesSelector = (state: AppState): ServiceState =>
  state.services;

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
