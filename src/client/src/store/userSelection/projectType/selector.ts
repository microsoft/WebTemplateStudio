import { createSelector } from "reselect";

import { AppState } from "../../combineReducers";
import { UserSelectionState } from "../../userSelection/combineReducers";

const getConfigSelector = (state: AppState): UserSelectionState => state.userSelection;

const getProjectTypeSelector = createSelector(getConfigSelector, (select) => select.projectType.internalName);

export { getProjectTypeSelector };
