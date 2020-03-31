export interface IVSCode {
  vscode: IVSCodeAPI;
}

export interface IVSCodeObject {
  postMessage: (message: any) => void;
}

export interface IVSCodeAPI {
  vscodeObject: IVSCodeObject;
}
