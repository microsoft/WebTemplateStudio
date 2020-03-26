import _ from "lodash";
import { createSelector } from "reselect";
import { ISelectedAppService } from "./appServiceReducer";
import { AppState } from "../../combineReducers";
import { ServiceState } from "..";

const getServices = (state: AppState): ServiceState =>
  state.selection.services;

const isAppServiceSelected = (services: ServiceState): boolean => {
  return !_.isEmpty(services.appService.selection);
};

const isAppServiceSelectedSelector = createSelector(
  getServices,
  isAppServiceSelected
);

const getAppServiceOptions = (
  services: ServiceState,
  isAppServiceSelected: boolean
): ISelectedAppService | null => {
  if (isAppServiceSelected) {
    return services.appService.selection;
  } else {
    return null;
  }
};

const getAppServiceSelectionSelector = createSelector(
  getServices,
  isAppServiceSelectedSelector,
  getAppServiceOptions
);

export {
  isAppServiceSelectedSelector,
  getAppServiceSelectionSelector
};
