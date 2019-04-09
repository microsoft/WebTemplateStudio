import { VSCODE_TYPEKEYS } from "./typeKeys";

export interface IVSCodeAPIActionType {
  type: VSCODE_TYPEKEYS.GET_VSCODE_API;
}

const getVSCodeApi = (): IVSCodeAPIActionType => ({
  type: VSCODE_TYPEKEYS.GET_VSCODE_API
});

export { getVSCodeApi };
