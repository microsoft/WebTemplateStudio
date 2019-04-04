import { combineReducers } from "redux";

import backendFramework from "./selectBackendFrameworkReducer";
import frontendFramework from "./selectFrontendFrameworkReducer";
import pages from "./selectPagesReducer";
import appType from "./selectWebAppReducer";
import projectNameObject from "./updateProjectName";
import outputPath from "./updateOutputPath";
import services from "./services";
import pageCount from "./pageCountReducer";
import projectPathValidation from "./validateProjectPath";

export default combineReducers({
  appType,
  frontendFramework,
  backendFramework,
  pages,
  services,
  outputPath,
  pageCount,
  projectNameObject,
  projectPathValidation
});
