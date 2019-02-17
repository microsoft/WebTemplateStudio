import { combineReducers } from "redux";
import azureProfileData from "./azureLoginReducers";
import vscodeApi from "./vscodeApiReducer";
import wizardContent from "./wizardContentReducers";
import selection from "./wizardSelectionReducers";
import modals from "./modalReducers";

export default combineReducers({
  vscode: vscodeApi,
  wizardContent,
  selection,
  azureProfileData,
  modals,
});
