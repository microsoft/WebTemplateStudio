import { combineReducers } from "redux";
import backendOptions from "./backendFrameworkReducer";
import frontendOptions from "./frontendFrameworkReducer";
import pageOptions from "./pagesOptionsReducer";
import projectTypes from "./projectTypeReducer";
import detailsPage from "./detailsPageReducer";
import previewStatus from "./previewReducer";
import serverPort from "./portReducer";

const wizardContentReducer = combineReducers({
  backendOptions,
  frontendOptions,
  pageOptions,
  projectTypes,
  detailsPage,
  serverPort,
  previewStatus
});

export default wizardContentReducer;
export type WizardContentType = ReturnType<typeof wizardContentReducer>;
