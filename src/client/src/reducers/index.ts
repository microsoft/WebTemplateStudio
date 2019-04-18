import { combineReducers } from "redux";
import azureProfileData from "./azureLoginReducers";
import modals from "./modalReducers";
import vscodeApi from "./vscodeApiReducer";
import wizardContent from "./wizardContentReducers";
import selection from "./wizardSelectionReducers";
import wizardRoutes from "./wizardRoutes";
import generationStatus from "./generationStatus";
import versions from "./versionsReducer";

const rootReducer = combineReducers({
  vscode: vscodeApi,
  wizardContent,
  selection,
  azureProfileData,
  modals,
  wizardRoutes,
  generationStatus,
  versions
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
