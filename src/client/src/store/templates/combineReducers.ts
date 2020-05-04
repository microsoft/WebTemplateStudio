import { combineReducers } from "redux";
import backendOptions from "./frameworks/backendFrameworkReducer";
import frontendOptions from "./frameworks/frontendFrameworkReducer";
import pageOptions from "./pages/pagesOptionsReducer";

const templatesReducer = combineReducers({
  backendOptions,
  frontendOptions,
  pageOptions
});

export default templatesReducer;
export type TemplateType = ReturnType<typeof templatesReducer>;