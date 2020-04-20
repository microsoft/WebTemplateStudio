import { combineReducers } from "redux";
import modals from "./modals/combineReducers";
import routes from "./routes/combineReducers";

const navigationReducer = combineReducers({
  modals,
  routes
});

export default navigationReducer;
export type ConfigState = ReturnType<typeof navigationReducer>;