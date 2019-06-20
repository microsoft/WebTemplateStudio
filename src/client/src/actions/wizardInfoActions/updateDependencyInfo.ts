import { WIZARD_INFO_TYPEKEYS } from "./typeKeys";

// payload received from extension should look like this
export interface IDependencyInfo {
  dependency: "python" | "node";
  installed: boolean;
}

export interface IUpdateDependencyInfo {
  type: WIZARD_INFO_TYPEKEYS.UPDATE_DEPENDENCY_INFO;
  payload: IDependencyInfo;
}

export const updateDependencyInfoAction = (
  dependencyInfo: IDependencyInfo
): IUpdateDependencyInfo => ({
  type: WIZARD_INFO_TYPEKEYS.UPDATE_DEPENDENCY_INFO,
  payload: dependencyInfo
});
