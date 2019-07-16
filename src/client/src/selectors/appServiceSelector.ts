import _ from "lodash";
import { createSelector } from "reselect";
import { ISelectedAppService } from "../reducers/wizardSelectionReducers/services/appServiceReducer";
import { AppState } from "../reducers";

interface ISelectedDropdowns {
  subscription?: IDropDownOptionType;
  resourceGroup?: IDropDownOptionType;
  siteName?: IDropDownOptionType;
  internalName?: IDropDownOptionType;
}

interface ISelectionInformation {
  dropdownSelection: ISelectedDropdowns;
  previousFormData: ISelectedAppService;
}

/**
 * Returns the App Service selection made by the user
 * Returns undefined if a selection was not made.
 *
 * @param services An object of all the services available in Project Acorn
 */
const getAppServiceSelectionInDropdownForm = (services: any): any => {
  const { selection } = services.selection.services.appService;
  if (!_.isEmpty(selection)) {
    const selectionInformation: ISelectionInformation = {
      dropdownSelection: {},
      previousFormData: selection
    };
    for (const selectionKey in selection) {
      if (selectionKey) {
        // @ts-ignore to allow dynamic key selection
        selectionInformation.dropdownSelection[selectionKey] = {
          value: selection[selectionKey],
          label: selection[selectionKey]
        };
      }
    }
    return selectionInformation;
  } else {
    return null;
  }
};

export { getAppServiceSelectionInDropdownForm };
