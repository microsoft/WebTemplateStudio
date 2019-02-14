import { combineReducers } from "redux";

import appTypeOptions from "./appTypeOptions";
import frontendOptions from "./frontendFrameworksReducer";
import pageOptions from "./pagesOptionsReducer";

export default combineReducers({
    appTypeOptions,
    frontendOptions,
    pageOptions,
});
