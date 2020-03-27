import { IOption } from "../../../types/option";
import { WIZARD_CONTENT_TYPEKEYS } from "../typeKeys";

export interface IUpdateFrameworkActionTypeAction {
  type: WIZARD_CONTENT_TYPEKEYS.UPDATE_FRAMEWORK;
  payload: IOption[];
}

export interface IFrontendFrameworksActionTypeAction {
  type: WIZARD_CONTENT_TYPEKEYS.SET_FRONTEND_FRAMEWORKS;
  payload: IOption[];
}

export interface IBackendFrameworksSuccessActionTypeAction {
  type: WIZARD_CONTENT_TYPEKEYS.SET_BACKEND_FRAMEWORKS;
  payload: IOption[];
}