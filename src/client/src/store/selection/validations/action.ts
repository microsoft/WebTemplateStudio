import { WIZARD_SELECTION_TYPEKEYS } from "../typeKeys";
import { IProjectPathValidationAction, IValidationsAction } from "./model";

export const setProjectPathValidationAction = (
  validation: any
): IProjectPathValidationAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.SET_PROJECT_PATH_VALIDATION,
  payload: validation
});

export const setValidationsAction = (
  validations: any
): IValidationsAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.SET_VALIDATIONS,
  payload: validations
});