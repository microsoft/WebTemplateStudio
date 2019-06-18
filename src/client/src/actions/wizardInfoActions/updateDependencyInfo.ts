import { WIZARD_INFO_TYPEKEYS } from "./typeKeys";

export interface IUpdateDependencyInfo {
  type: WIZARD_INFO_TYPEKEYS.UPDATE_DEPENDENCY_INFO;
  payload: any;
}

export const updateDependencyInfoAction = (
  dependencyInfo: any
): IUpdateDependencyInfo => ({
  type: WIZARD_INFO_TYPEKEYS.UPDATE_DEPENDENCY_INFO,
  payload: dependencyInfo
});

/* Payload should look like
 * payload : {
    dependency: "python" | "node"
    installed: boolean
  } 
*/
