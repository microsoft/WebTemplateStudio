import { combineReducers } from "redux";
import azureProfileData from "./azureLoginReducers";
import modals from "./modalReducers";
import vscodeApi from "./vscodeApiReducer";
import wizardContent from "./wizardContentReducers";
import selection from "./wizardSelectionReducers";
import wizardRoutes from "./wizardRoutes";

export default combineReducers({
  vscode: vscodeApi,
  wizardContent,
  selection,
  azureProfileData,
  modals,
  wizardRoutes
});
