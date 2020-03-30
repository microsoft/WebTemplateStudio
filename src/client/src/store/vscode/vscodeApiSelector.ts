import { IVSCodeObject } from "./model";
import { IVersions } from "../../types/version";
import { AppState } from "../combineReducers";

const getVSCodeApiSelector = (state: AppState): IVSCodeObject =>
  state.vscode.vscodeObject;

const getVersionsSelector = (state: any): IVersions => state.versions;

export { getVSCodeApiSelector, getVersionsSelector };
