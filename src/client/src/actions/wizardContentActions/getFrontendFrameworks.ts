import { WIZARD_CONTENT_TYPEKEYS } from "./typeKeys";
import { IOption } from "../../types/option";

export interface IFrontendFrameworksActionType {
  type: WIZARD_CONTENT_TYPEKEYS.GET_FRONTEND_FRAMEWORKS_SUCCESS;
  payload: IOption[];
}

export const getFrontendFrameworksSuccess = (
  frameworks: IOption[]
): IFrontendFrameworksActionType => ({
  type: WIZARD_CONTENT_TYPEKEYS.GET_FRONTEND_FRAMEWORKS_SUCCESS,
  payload: frameworks
});
