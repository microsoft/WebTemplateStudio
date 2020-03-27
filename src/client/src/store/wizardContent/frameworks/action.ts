import { IOption } from "../../../types/option";
import { IUpdateFrameworkActionTypeAction, IFrontendFrameworksActionTypeAction, IBackendFrameworksSuccessActionTypeAction } from "./model";
import { WIZARD_CONTENT_TYPEKEYS } from "../typeKeys";

export const updateFrameworksAction = (
  frameworks: IOption[]
): IUpdateFrameworkActionTypeAction => ({
  type: WIZARD_CONTENT_TYPEKEYS.UPDATE_FRAMEWORK,
  payload: frameworks
});

export const setFrontendFrameworksAction = (
  frameworks: IOption[]
): IFrontendFrameworksActionTypeAction => ({
  type: WIZARD_CONTENT_TYPEKEYS.SET_FRONTEND_FRAMEWORKS,
  payload: frameworks
});

export const setBackendFrameworksAction = (
  frameworks: IOption[]
): IBackendFrameworksSuccessActionTypeAction => ({
  type: WIZARD_CONTENT_TYPEKEYS.SET_BACKEND_FRAMEWORKS,
  payload: frameworks
});
