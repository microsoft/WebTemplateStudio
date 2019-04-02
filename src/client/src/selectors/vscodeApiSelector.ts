import { IVSCodeObject } from "../reducers/vscodeApiReducer";

const getVSCodeApiSelector = (state: any): IVSCodeObject =>
  state.vscode.vscodeObject;

export { getVSCodeApiSelector };
