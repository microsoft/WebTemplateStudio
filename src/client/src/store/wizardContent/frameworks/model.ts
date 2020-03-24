import { IOption } from "../../../types/option";
import { WIZARD_CONTENT_TYPEKEYS } from "../typeKeys";

export interface IUpdateFrameworkActionType {
  type: WIZARD_CONTENT_TYPEKEYS.UPDATE_FRAMEWORK;
  payload: IOption[];
}

export interface IFrontendFrameworksActionType {
  type: WIZARD_CONTENT_TYPEKEYS.SET_FRONTEND_FRAMEWORKS;
  payload: IOption[];
}

export interface IBackendFrameworksSuccessActionType {
  type: WIZARD_CONTENT_TYPEKEYS.SET_BACKEND_FRAMEWORKS;
  payload: IOption[];
}
