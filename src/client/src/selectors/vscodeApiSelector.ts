import { IVSCodeObject } from "../store/vscode/vscodeApiReducer";
import { IVersions } from "../types/version";
import { AppState } from "../store/combineReducers";

const getVSCodeApiSelector = (state: AppState): IVSCodeObject =>
  state.vscode.vscodeObject;

const getVersionsSelector = (state: any): IVersions => state.versions;

export { getVSCodeApiSelector, getVersionsSelector };
