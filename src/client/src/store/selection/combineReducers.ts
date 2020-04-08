import { combineReducers } from "redux";

import services from "../azureProfileData";
import appType from "./app/selectWebAppReducer";

const SelectionStateReducer = combineReducers({
  appType,
  services
});

export default SelectionStateReducer;
export type SelectionState = ReturnType<typeof SelectionStateReducer>;
