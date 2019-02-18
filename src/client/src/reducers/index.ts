import { combineReducers } from "redux";
import azureProfileData from "./azureLoginReducers";
import modals from "./modalReducers";
import services from "./services";
import vscodeApi from "./vscodeApiReducer";
import wizardContent from "./wizardContentReducers";
import selection from "./wizardSelectionReducers";

export default combineReducers({
  vscode: vscodeApi,
  wizardContent,
  selection,
  azureProfileData,
  services,
  modals
});
