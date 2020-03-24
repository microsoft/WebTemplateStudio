import { IResetWizard, IDependencyInfo, IUpdateDependencyInfo, IPreviewStatusActionType } from "./model";
import { WIZARD_INFO_TYPEKEYS, WIZARD_CONTENT_TYPEKEYS } from "../typeKeys";

export const resetWizardAction = (): IResetWizard => ({
  type: WIZARD_INFO_TYPEKEYS.RESET_WIZARD
});

export const updateDependencyInfoAction = (
  dependencyInfo: IDependencyInfo
): IUpdateDependencyInfo => ({
  type: WIZARD_INFO_TYPEKEYS.UPDATE_DEPENDENCY_INFO,
  payload: dependencyInfo
});

export const setPreviewStatusAction = (
  isPreview: boolean
): IPreviewStatusActionType => ({
  payload: isPreview,
  type: WIZARD_CONTENT_TYPEKEYS.SET_PREVIEW_STATUS
});
