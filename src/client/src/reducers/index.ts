import { combineReducers } from "redux";
import vscodeApi from "./vscodeApiReducer";
import wizardContent from "./wizardContentReducers";

export default combineReducers({
  vscode: vscodeApi,
  wizardContent
});
