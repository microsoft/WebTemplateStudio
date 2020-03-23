import { IOption } from "../../../types/option";
import { IUpdateFrameworkActionType, IFrontendFrameworksActionType, IBackendFrameworksSuccessActionType } from "./model";
import { WIZARD_CONTENT_TYPEKEYS } from "../../../actions/wizardContentActions/typeKeys";

export const updateFrameworksAction = (
  frameworks: IOption[]
): IUpdateFrameworkActionType => ({
  type: WIZARD_CONTENT_TYPEKEYS.UPDATE_FRAMEWORK,
  payload: frameworks
});

export const setFrontendFrameworksAction = (
  frameworks: IOption[]
): IFrontendFrameworksActionType => ({
  type: WIZARD_CONTENT_TYPEKEYS.SET_FRONTEND_FRAMEWORKS,
  payload: frameworks
});

export const setBackendFrameworksAction = (
  frameworks: IOption[]
): IBackendFrameworksSuccessActionType => ({
  type: WIZARD_CONTENT_TYPEKEYS.SET_BACKEND_FRAMEWORKS,
  payload: frameworks
});
