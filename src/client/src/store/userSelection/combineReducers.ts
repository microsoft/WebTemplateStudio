import { combineReducers } from "redux";

import outputPathObject from "./app/updateOutputPathReducer";
import projectNameObject from "./app/updateProjectNameReducer";
import backendFramework from "./frameworks/selectBackendFrameworkReducer";
import frontendFramework from "./frameworks/selectFrontendFrameworkReducer";
import pages from "./pages/selectPagesReducer";
import projectType from "./projectType/reducer";
import services from "./services/combineReducers";

const UserSelectionStateReducer = combineReducers({
  frontendFramework,
  backendFramework,
  pages,
  outputPathObject,
  projectNameObject,
  services,
  projectType,
});

export default UserSelectionStateReducer;
export type UserSelectionState = ReturnType<typeof UserSelectionStateReducer>;
