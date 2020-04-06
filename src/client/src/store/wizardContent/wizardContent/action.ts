import { IResetWizardAction, IPreviewStatusActionTypeAction } from "./model";
import { WIZARD_INFO_TYPEKEYS, WIZARD_CONTENT_TYPEKEYS } from "../typeKeys";

export const resetWizardAction = (): IResetWizardAction => ({
  type: WIZARD_INFO_TYPEKEYS.RESET_WIZARD
});

export const setPreviewStatusAction = (
  isPreview: boolean
): IPreviewStatusActionTypeAction => ({
  payload: isPreview,
  type: WIZARD_CONTENT_TYPEKEYS.SET_PREVIEW_STATUS
});