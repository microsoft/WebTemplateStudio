import { combineReducers } from "redux";
import vscodeApi from "./vscodeApiReducer";
import wizardContent from "./wizardContentReducers";
import selection from "./wizardSelectionReducers";

export default combineReducers({
  vscode: vscodeApi,
  wizardContent,
  selection,
});
