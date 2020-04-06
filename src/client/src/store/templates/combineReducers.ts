import { combineReducers } from "redux";
import backendOptions from "./frameworks/backendFrameworkReducer";
import frontendOptions from "./frameworks/frontendFrameworkReducer";
import pageOptions from "./pages/pagesOptionsReducer";
import detailsPage from "./pages/detailsPageReducer";
import previewStatus from "./wizardContent/previewReducer";

const wizardContentReducer = combineReducers({
  backendOptions,
  frontendOptions,
  pageOptions,
  detailsPage,
  previewStatus
});

export default wizardContentReducer;
export type WizardContentType = ReturnType<typeof wizardContentReducer>;