import { WIZARD_INFO_TYPEKEYS, WIZARD_CONTENT_TYPEKEYS } from "../typeKeys";

export interface IResetWizard {
    type: WIZARD_INFO_TYPEKEYS.RESET_WIZARD;
}

export interface IUpdateDependencyInfo {
    type: WIZARD_INFO_TYPEKEYS.UPDATE_DEPENDENCY_INFO;
    payload: IDependencyInfo;
}

export interface IDependencyInfo {
    dependency: "python" | "node";
    installed: boolean;
}

export interface IPreviewStatusActionType {
    type: WIZARD_CONTENT_TYPEKEYS.SET_PREVIEW_STATUS;
    payload: boolean;
}