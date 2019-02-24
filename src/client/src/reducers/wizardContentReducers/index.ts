import { combineReducers } from "redux";
import backendOptions from "./backendFrameworkReducer";
import frontendOptions from "./frontendFrameworkReducer";
import pageOptions from "./pagesOptionsReducer";
import projectTypes from "./projectTypeReducer";

export default combineReducers({
  backendOptions,
  frontendOptions,
  pageOptions,
  projectTypes
});
