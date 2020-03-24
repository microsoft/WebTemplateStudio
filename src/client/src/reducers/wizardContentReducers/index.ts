import { combineReducers } from "redux";
import backendOptions from "./backendFrameworkReducer";
import frontendOptions from "./frontendFrameworkReducer";
import pageOptions from "./pagesOptionsReducer";
import detailsPage from "./detailsPageReducer";
import previewStatus from "./previewReducer";

const wizardContentReducer = combineReducers({
  backendOptions,
  frontendOptions,
  pageOptions,
  detailsPage,
  previewStatus
});

export default wizardContentReducer;
export type WizardContentType = ReturnType<typeof wizardContentReducer>;