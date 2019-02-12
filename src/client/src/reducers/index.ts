import { combineReducers } from "redux";
import vscodeApi from "./vscodeApiReducer";

export default combineReducers({
  vscode: vscodeApi
});
