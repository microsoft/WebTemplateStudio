import { combineReducers } from "redux";

import backendFramework from "./selectBackendFrameworkReducer";
import frontendFramework from "./selectFrontendFrameworkReducer";
import pages from "./selectPagesReducer";
import appType from "./selectWebAppReducer";
import projectName from "./updateProjectName";
import outputPath from "./updateOutputPath";
import services from "./services";

export default combineReducers({
  appType,
  frontendFramework,
  backendFramework,
  pages,
  services,
  outputPath,
  projectName
});
