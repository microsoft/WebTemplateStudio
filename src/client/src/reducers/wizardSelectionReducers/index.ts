import { combineReducers } from "redux";

import backendFramework from "./selectBackendFrameworkReducer";
import frontendFramework from "./selectFrontendFrameworkReducer";
import pages from "./selectPagesReducer";
import appType from "./selectWebAppReducer";
import projectNameObject from "./updateProjectName";
import validations from "./setValidations";
import outputPathObject from "./updateOutputPath";
import services from "./services";
import isValidatingName from "./validatingNameReducer";

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
