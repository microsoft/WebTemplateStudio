import { VSCODE_TYPEKEYS } from "./typeKeys";

export interface IVSCodeAPIActionType {
  type: VSCODE_TYPEKEYS.GET_VSCODE_API;
}

export interface IVSCode {
  vscode: IVSCodeAPI;
}

export interface IVSCodeObject {
  postMessage: (message: any) => void;
}

export interface IVSCodeAPI {
  isVsCodeApiAcquired: boolean;
  vscodeObject: IVSCodeObject;
}
