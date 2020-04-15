import { IResetWizardAction, IPreviewStatusActionTypeAction, ILoad } from "./model";
import { CONFIG_TYPEKEYS } from "../../typeKeys";

export const resetWizardAction = (): IResetWizardAction => ({
  type: CONFIG_TYPEKEYS.RESET_WIZARD
});

export const setPreviewStatusAction = (
  isPreview: boolean
): IPreviewStatusActionTypeAction => ({
  payload: isPreview,
  type: CONFIG_TYPEKEYS.SET_PREVIEW_STATUS
});

export const loadAction = (): ILoad => ({
  type: CONFIG_TYPEKEYS.LOAD
});