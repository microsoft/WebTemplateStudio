import { WIZARD_CONTENT_TYPEKEYS } from "./typeKeys";

export interface IVSCodeAPIActionType {
  type: WIZARD_CONTENT_TYPEKEYS.GET_VSCODE_API;
}

const getVSCodeApi = (): IVSCodeAPIActionType => ({
  type: WIZARD_CONTENT_TYPEKEYS.GET_VSCODE_API
});

export { getVSCodeApi };
