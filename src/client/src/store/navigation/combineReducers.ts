import { combineReducers } from "redux";
import modals from "./modals/combineReducers";
import routes from "./routes/combineReducers";
import isDirty from "./isDirty/isDirtyReducer";
import routesList from "./routesList/reducer";

const navigationReducer = combineReducers({
  modals,
  routes,
  routesList,
  isDirty
});

export default navigationReducer;
export type ConfigState = ReturnType<typeof navigationReducer>;