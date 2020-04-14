import { CONFIG_TYPEKEYS } from "../configTypeKeys";

export interface IResetWizardAction {
    type: CONFIG_TYPEKEYS.RESET_WIZARD;
}

export interface IPreviewStatusActionTypeAction {
    type: CONFIG_TYPEKEYS.SET_PREVIEW_STATUS;
    payload: boolean;
}