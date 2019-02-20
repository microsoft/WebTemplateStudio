import { combineReducers } from "redux";

import appTypeOptions from "./appTypeOptions";
import backendOptions from "./backendFrameworksReducer";
import frontendOptions from "./frontendFrameworksReducer";
import pageOptions from "./pagesOptionsReducer";
import projectTypes from "./projectTypeReducer";

export default combineReducers({
  appTypeOptions,
  frontendOptions,
  backendOptions,
  pageOptions,
  projectTypes
});
