import { combineReducers } from "redux";
import vscodeApi from "./vscodeApiReducer";
import wizardContent from "./wizardContent";

export default combineReducers({
  vscode: vscodeApi,
  wizardContent
});
