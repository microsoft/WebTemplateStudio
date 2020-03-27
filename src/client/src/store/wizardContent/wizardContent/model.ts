import { WIZARD_INFO_TYPEKEYS, WIZARD_CONTENT_TYPEKEYS } from "../typeKeys";

export interface IResetWizardAction {
    type: WIZARD_INFO_TYPEKEYS.RESET_WIZARD;
}

export interface IUpdateDependencyInfoAction {
    type: WIZARD_INFO_TYPEKEYS.UPDATE_DEPENDENCY_INFO;
    payload: IDependencyInfoAction;
}

export interface IDependencyInfoAction {
    dependency: "python" | "node";
    installed: boolean;
}

export interface IPreviewStatusActionTypeAction {
    type: WIZARD_CONTENT_TYPEKEYS.SET_PREVIEW_STATUS;
    payload: boolean;
}