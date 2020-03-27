import { combineReducers } from "redux";

import backendFramework from "./frameworks/selectBackendFrameworkReducer";
import frontendFramework from "./frameworks/selectFrontendFrameworkReducer";
import pages from "./pages/selectPagesReducer";
import appType from "./app/selectWebAppReducer";
import projectNameObject from "./app/updateProjectNameReducer";
import validations from "./validations/setValidations";
import outputPathObject from "./app/updateOutputPathReducer";
import services from "../azureProfileData";
import isValidatingName from "./validations/validatingNameReducer";

const selectionStateReducer = combineReducers({
  appType,
  frontendFramework,
  backendFramework,
  pages,
  services,
  outputPathObject,
  isValidatingName,
  projectNameObject,
  validations
});

export default selectionStateReducer;
export type SelectionState = ReturnType<typeof selectionStateReducer>;
