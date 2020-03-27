import { VSCODE_TYPEKEYS } from "./typeKeys";
import { IVSCodeAPIActionType } from "./model";

const getVSCodeApi = (): IVSCodeAPIActionType => ({
  type: VSCODE_TYPEKEYS.GET_VSCODE_API
});

export { getVSCodeApi };
