import { combineReducers } from "redux";
import {profileData, isLoggedIn} from "./login/reducer";
import { subscriptionData } from "./azure/reducer";

export default combineReducers({
  isLoggedIn,
  profileData,
  subscriptionData
});
