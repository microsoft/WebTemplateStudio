import { combineReducers } from "redux";
import modals from "./modals/combineReducers";
import routes from "./routes/combineReducers";
import isDirty from "./isDirty/isDirtyReducer";

const navigationReducer = combineReducers({
  modals,
  routes,
  isDirty
});

export default navigationReducer;
export type ConfigState = ReturnType<typeof navigationReducer>;