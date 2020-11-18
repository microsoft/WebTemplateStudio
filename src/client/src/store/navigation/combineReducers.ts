import { combineReducers } from "redux";
import modals from "./modals/combineReducers";
import routesNavItems from "./routesNavItems/reducer";

const navigationReducer = combineReducers({
  modals, routesNavItems
});

export default navigationReducer;
export type ConfigState = ReturnType<typeof navigationReducer>;