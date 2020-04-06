import { WIZARD_INFO_TYPEKEYS, WIZARD_CONTENT_TYPEKEYS } from "../typeKeys";

export interface IResetWizardAction {
    type: WIZARD_INFO_TYPEKEYS.RESET_WIZARD;
}

export interface IPreviewStatusActionTypeAction {
    type: WIZARD_CONTENT_TYPEKEYS.SET_PREVIEW_STATUS;
    payload: boolean;
}