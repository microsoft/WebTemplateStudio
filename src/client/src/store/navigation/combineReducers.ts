import { combineReducers } from "redux";
import modals from "./modals/combineReducers";

const navigationReducer = combineReducers({
  modals
});

export default navigationReducer;
export type ConfigState = ReturnType<typeof navigationReducer>;