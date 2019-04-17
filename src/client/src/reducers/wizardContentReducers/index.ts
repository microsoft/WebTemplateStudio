import { combineReducers } from "redux";
import backendOptions from "./backendFrameworkReducer";
import frontendOptions from "./frontendFrameworkReducer";
import pageOptions from "./pagesOptionsReducer";
import projectTypes from "./projectTypeReducer";
import detailsPage from "./detailsPageReducer";

const wizardContentReducer = combineReducers({
  backendOptions,
  frontendOptions,
  pageOptions,
  projectTypes,
  detailsPage
});

export default wizardContentReducer;
export type WizardContentType = ReturnType<typeof wizardContentReducer>;
