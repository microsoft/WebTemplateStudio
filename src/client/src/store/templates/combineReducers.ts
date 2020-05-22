import { combineReducers } from "redux";
import backendOptions from "./frameworks/backendFrameworkReducer";
import frontendOptions from "./frameworks/frontendFrameworkReducer";
import pageOptions from "./pages/pagesOptionsReducer";
import featureOptions from "./features/reducer";

const templatesReducer = combineReducers({
  backendOptions,
  frontendOptions,
  pageOptions,
  featureOptions,
});

export default templatesReducer;
export type TemplateType = ReturnType<typeof templatesReducer>;