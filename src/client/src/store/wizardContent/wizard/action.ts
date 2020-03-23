import { IResetWizard, IDependencyInfo, IUpdateDependencyInfo } from "./model";
import { WIZARD_INFO_TYPEKEYS } from "../typeKeys";

export const resetWizardAction = (): IResetWizard => ({
  type: WIZARD_INFO_TYPEKEYS.RESET_WIZARD
});

export const updateDependencyInfoAction = (
  dependencyInfo: IDependencyInfo
): IUpdateDependencyInfo => ({
  type: WIZARD_INFO_TYPEKEYS.UPDATE_DEPENDENCY_INFO,
  payload: dependencyInfo
});