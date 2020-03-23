import { IOption } from "../../../types/option";
import { IUpdateFrameworkActionType, IFrontendFrameworksActionType } from "./model";
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
