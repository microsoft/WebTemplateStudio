import { WIZARD_CONTENT_TYPEKEYS } from "./typeKeys";
import { IOption } from "../../types/option";

export interface IBackendFrameworksSuccessActionType {
  type: WIZARD_CONTENT_TYPEKEYS.GET_BACKEND_FRAMEWORKS_SUCCESS;
  payload: IOption[];
}

export const getBackendFrameworksSuccess = (
  frameworks: IOption[]
): IBackendFrameworksSuccessActionType => ({
  type: WIZARD_CONTENT_TYPEKEYS.GET_BACKEND_FRAMEWORKS_SUCCESS,
  payload: frameworks
});
