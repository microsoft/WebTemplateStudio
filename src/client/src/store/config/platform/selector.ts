import { createSelector } from "reselect";
import { UserSelectionState } from "../../userSelection/combineReducers";
import { AppState } from "../../combineReducers";

const getConfigSelector = (state: AppState): UserSelectionState => state.userSelection

const getProjectTypeSelector = createSelector(
  getConfigSelector,
  (select) => select.projectType
);

export { getProjectTypeSelector };