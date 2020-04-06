import { combineReducers } from "redux";
import backendOptions from "./frameworks/backendFrameworkReducer";
import frontendOptions from "./frameworks/frontendFrameworkReducer";
import pageOptions from "./pages/pagesOptionsReducer";

const wizardContentReducer = combineReducers({
  backendOptions,
  frontendOptions,
  pageOptions
});

export default wizardContentReducer;
export type TemplateType = ReturnType<typeof wizardContentReducer>;