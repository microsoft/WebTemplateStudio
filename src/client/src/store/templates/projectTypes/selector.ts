import { createSelector } from "reselect";
import { IOption } from "../../../types/option";
import { AppState } from "../../combineReducers";

const getProjectTypeSelector = (state: AppState): IOption[] => state.templates.projectTypesOptions;

const getDropdownProjectTypeSelector = createSelector([getProjectTypeSelector], (projectTypes) => {
  return projectTypes.map((projectType) => {
    return {
      label: projectType.title,
      value: projectType.internalName,
    };
  }) as IDropDownOptionType[];
});

export { getDropdownProjectTypeSelector };
