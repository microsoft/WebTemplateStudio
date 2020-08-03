import { combineReducers } from "redux";
import modals from "./modals/combineReducers";
import routes from "./routes/combineReducers";
import isDirty from "./isDirty/isDirtyReducer";
import routesNavItems from "./routesNavItems/reducer";

const navigationReducer = combineReducers({
  modals,
  routes,
  routesNavItems,
  isDirty
});

export default navigationReducer;
export type ConfigState = ReturnType<typeof navigationReducer>;