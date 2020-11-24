import { IOption } from "../../../types/option";
import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";

export interface IUpdateFrameworkActionTypeAction {
  type: TEMPLATES_TYPEKEYS.UPDATE_FRAMEWORK;
  payload: IOption[];
}

export interface IFrontendFrameworksActionTypeAction {
  type: TEMPLATES_TYPEKEYS.SET_FRONTEND_FRAMEWORKS;
  payload: IOption[];
}

export interface IBackendFrameworksSuccessActionTypeAction {
  type: TEMPLATES_TYPEKEYS.SET_BACKEND_FRAMEWORKS;
  payload: IOption[];
}
