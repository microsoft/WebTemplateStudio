import { IVSCodeObject } from "../reducers/vscodeApiReducer";
import { IVersions } from "../types/version";
import { AppState } from "../reducers";

const getVSCodeApiSelector = (state: AppState): IVSCodeObject =>
  state.vscode.vscodeObject;

const getVersionsSelector = (state: any): IVersions => state.versions;

export { getVSCodeApiSelector, getVersionsSelector };
