import { combineReducers } from "redux";

import backendFramework from "./frameworks/selectBackendFrameworkReducer";
import frontendFramework from "./frameworks/selectFrontendFrameworkReducer";
import pages from "./pages/selectPagesReducer";
import projectNameObject from "./app/updateProjectNameReducer";
import outputPathObject from "./app/updateOutputPathReducer";
import services from "./services/combineReducers";
import projectType from "./projectType/reducer";

const UserSelectionStateReducer = combineReducers({
  frontendFramework,
  backendFramework,
  pages,
  outputPathObject,
  projectNameObject,
  services,
  projectType
});

export default UserSelectionStateReducer;
export type UserSelectionState = ReturnType<typeof UserSelectionStateReducer>;
