import { WIZARD_INFO_TYPEKEYS } from "../typeKeys";

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
  