import { combineReducers } from "redux";
import { isLoggedIn } from "./login/reducer";
import { subscriptionData } from "./azure/reducer";

export default combineReducers({
  isLoggedIn,
  subscriptionData
});
