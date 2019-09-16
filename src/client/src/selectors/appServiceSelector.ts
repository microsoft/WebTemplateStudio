import _ from "lodash";
import { createSelector } from "reselect";
import { ISelectedAppService } from "../reducers/wizardSelectionReducers/services/appServiceReducer";
import { AppState } from "../reducers";
import { ServiceState } from "../reducers/wizardSelectionReducers/services";

interface ISelectedDropdowns {
  subscription?: IDropDownOptionType;
  resourceGroup?: IDropDownOptionType;
  siteName?: IDropDownOptionType;
  internalName?: IDropDownOptionType;
}

export interface ISelectionInformation {
  dropdownSelection: ISelectedDropdowns;
  previousFormData: ISelectedAppService | null;
}

const getServicesSelector = (state: AppState): ServiceState =>
  state.selection.services;

const isAppServiceSelected = (services: ServiceState): boolean => {
  return !_.isEmpty(services.appService.selection);
};

const isAppServiceSelectedSelector = createSelector(
  getServicesSelector,
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
  getServicesSelector,
  isAppServiceSelectedSelector,
  getAppServiceOptions
);

/**
 * Returns the App Service selection made by the user
 * Returns undefined if a selection was not made.
 *
 * @param services An object of all the services available in Web Template Studio
 */
const getAppServiceSelectionInDropdownForm = (
  appState: AppState
): ISelectionInformation | undefined => {
  const selection: ISelectedAppService | null =
    appState.selection.services.appService.selection;
  if (selection && !_.isEmpty(selection)) {
    const selectionInformation: ISelectionInformation = {
      dropdownSelection: {},
      previousFormData: selection
    };

    selectionInformation.dropdownSelection.internalName = {
      value: selection.internalName,
      label: selection.internalName
    };
    selectionInformation.dropdownSelection.siteName = {
      value: selection.siteName,
      label: selection.siteName
    };
    selectionInformation.dropdownSelection.resourceGroup = {
      value: selection.resourceGroup,
      label: selection.resourceGroup
    };
    selectionInformation.dropdownSelection.subscription = {
      value: selection.subscription,
      label: selection.subscription
    };

    return selectionInformation;
  } else {
    return undefined;
  }
};

export {
  getAppServiceSelectionInDropdownForm,
  isAppServiceSelectedSelector,
  getAppServiceSelectionSelector
};
