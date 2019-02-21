import { combineReducers } from "redux";

import profileData from "./azureProfileReducer";
import isLoggedIn from "./isLoggedInReducer";

export default combineReducers({
    isLoggedIn,
    profileData
});
