import { createSelector } from "reselect";

import { IOption } from "../../../types/option";
import { AppState } from "../../combineReducers";

const getFrontendFrameworkSelector = (state: AppState): IOption[] => state.templates.frontendOptions;
const getBackendFrameworkSelector = (state: AppState): IOption[] => state.templates.backendOptions;

const getDropdownFrontendFrameworksSelector = createSelector([getFrontendFrameworkSelector], (frontendFrameworks) => {
  return frontendFrameworks.map((framework) => {
    return {
      label: framework.title,
      value: framework.internalName,
    };
  }) as IDropDownOptionType[];
});

const getDropdownBackendFrameworksSelector = createSelector([getBackendFrameworkSelector], (backendFrameworks) => {
  return backendFrameworks.map((backendFrameworks) => {
    return {
      label: backendFrameworks.title,
      value: backendFrameworks.internalName,
    };
  }) as IDropDownOptionType[];
});

export { getDropdownBackendFrameworksSelector, getDropdownFrontendFrameworksSelector };
