import { IResetWizardAction, IPreviewStatusActionTypeAction } from "./model";
import { WIZARD_INFO_TYPEKEYS, TEMPLATES_TYPEKEYS } from "../../typeKeys";

export const resetWizardAction = (): IResetWizardAction => ({
  type: WIZARD_INFO_TYPEKEYS.RESET_WIZARD
});

export const setPreviewStatusAction = (
  isPreview: boolean
): IPreviewStatusActionTypeAction => ({
  payload: isPreview,
  type: TEMPLATES_TYPEKEYS.SET_PREVIEW_STATUS
});