import { combineReducers } from "redux";
import backendOptions from "./frameworks/backendFrameworkReducer";
import frontendOptions from "./frameworks/frontendFrameworkReducer";
import pageOptions from "./pages/pagesOptionsReducer";
import featureOptions from "./features/reducer";
import projectTypesOptions from "./projectTypes/reducer";

const templatesReducer = combineReducers({
  backendOptions,
  frontendOptions,
  pageOptions,
  featureOptions,
  projectTypesOptions
});

export default templatesReducer;
export type TemplateType = ReturnType<typeof templatesReducer>;