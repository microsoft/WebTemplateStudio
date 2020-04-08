import { combineReducers } from "redux";

import services from "../azureProfileData";

const SelectionStateReducer = combineReducers({
  services
});

export default SelectionStateReducer;
export type SelectionState = ReturnType<typeof SelectionStateReducer>;
