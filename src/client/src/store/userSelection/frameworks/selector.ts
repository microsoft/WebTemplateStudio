import { createSelector } from "reselect";

import { IOption } from "../../../types/option";
import { AppState } from "../../combineReducers";

const getFrontendFrameworkSelector = (state: AppState): IOption[] => state.templates.frontendOptions;
const getBackendFrameworkSelector = (state: AppState): IOption[] => state.templates.backendOptions;

const getDropdownFrontendFrameworksSelector = createSelector([getFrontendFrameworkSelector], (frontendFrameworks) => {
  return frontendFrameworks.map((frontendFramework) => {
    return {
      label: frontendFramework.internalName,
      value: frontendFramework.title,
    };
  }) as IDropDownOptionType[];
});

const getDropdownBackendFrameworksSelector = createSelector([getBackendFrameworkSelector], (backendFrameworks) => {
  return backendFrameworks.map((backendFrameworks) => {
    return {
      label: backendFrameworks.internalName,
      value: backendFrameworks.title,
    };
  }) as IDropDownOptionType[];
});

export { getDropdownBackendFrameworksSelector, getDropdownFrontendFrameworksSelector };
