import { combineReducers } from "redux";
import azureProfileData from "./azureLoginReducers";
import dependencyInfo from "./dependencyInfoReducers";
import generationStatus from "./generationStatus";
import modals from "./modalReducers";
import wizardContent from "./wizardContentReducers";
import wizardRoutes from "./wizardRoutes";
import vscodeApi from "./vscodeApiReducer";
import selection from "./wizardSelectionReducers";
import versions from "./versionsReducer";

const rootReducer = combineReducers({
  vscode: vscodeApi,
  wizardContent,
  selection,
  azureProfileData,
  modals,
  wizardRoutes,
  generationStatus,
  versions,
  dependencyInfo
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
