import { combineReducers } from "redux";

import appTypeOptions from "./appTypeOptions";
import pageOptions from "./pagesOptionsReducer";

export default combineReducers({
    appTypeOptions,
    pageOptions,
});
