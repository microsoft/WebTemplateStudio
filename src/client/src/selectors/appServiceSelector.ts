import _ from "lodash";
import { createSelector } from "reselect";
import { ISelectedAppService } from "../reducers/wizardSelectionReducers/services/appServiceReducer";
import { AppState } from "../reducers";

interface ISelectedDropdowns {
  subscription?: IDropDownOptionType;
  resourceGroup?: IDropDownOptionType;
  siteName?: IDropDownOptionType;
  internalName?: IDropDownOptionType;
  chooseExistingRadioButtonSelected?: boolean;
}

export interface ISelectionInformation {
  dropdownSelection: ISelectedDropdowns;
  previousFormData: ISelectedAppService | null;
}

/**
 * Returns the App Service selection made by the user
 * Returns undefined if a selection was not made.
 *
 * @param services An object of all the services available in Project Acorn
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

export { getAppServiceSelectionInDropdownForm };
