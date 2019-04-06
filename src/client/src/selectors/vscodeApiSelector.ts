import { IVSCodeObject } from "../reducers/vscodeApiReducer";
import { IVersions } from "../types/version";

const getVSCodeApiSelector = (state: any): IVSCodeObject =>
  state.vscode.vscodeObject;

const getVersionsSelector = (state: any): IVersions => state.versions;

export { getVSCodeApiSelector, getVersionsSelector };
