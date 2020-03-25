import { combineReducers } from "redux";

import backendFramework from "../../store/selection/frameworks/selectBackendFrameworkReducer";
import frontendFramework from "../../store/selection/frameworks/selectFrontendFrameworkReducer";
import pages from "../../store/selection/pages/selectPagesReducer";
import appType from "../../store/selection/app/selectWebAppReducer";
import projectNameObject from "../../store/selection/app/updateProjectName";
import validations from "../../store/selection/validations/setValidations";
import outputPathObject from "../../store/selection/app/updateOutputPath";
import services from "./services";
import isValidatingName from "../../store/selection/validations/validatingNameReducer";

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
