import { WIZARD_INFO_TYPEKEYS, TEMPLATES_TYPEKEYS } from "../../typeKeys";

export interface IResetWizardAction {
    type: WIZARD_INFO_TYPEKEYS.RESET_WIZARD;
}

export interface IPreviewStatusActionTypeAction {
    type: TEMPLATES_TYPEKEYS.SET_PREVIEW_STATUS;
    payload: boolean;
}