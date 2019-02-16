import { combineReducers } from "redux";

import appTypeOptions from "./appTypeOptions";
import azureData from "./azureLoginReducers";
import backendOptions from "./backendFrameworksReducer";
import frontendOptions from "./frontendFrameworksReducer";
import pageOptions from "./pagesOptionsReducer";

export default combineReducers({
    appTypeOptions,
    frontendOptions,
    backendOptions,
    pageOptions,
    azureData,
});
