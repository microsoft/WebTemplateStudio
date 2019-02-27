import { combineReducers } from "redux";

import profileData from "./azureProfileReducer";
import isLoggedIn from "./isLoggedInReducer";
import subscriptionData from "./subscriptionsReducer";

export default combineReducers({
    isLoggedIn,
    profileData,
    subscriptionData
});
