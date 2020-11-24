import { IProjectPathValidationAction, IValidationsAction } from "./model";
import { CONFIG_TYPEKEYS } from "../configTypeKeys";

export const setProjectPathValidationAction = (validation: any): IProjectPathValidationAction => ({
  type: CONFIG_TYPEKEYS.SET_PROJECT_PATH_VALIDATION,
  payload: validation,
});

export const setValidationsAction = (validations: any): IValidationsAction => ({
  type: CONFIG_TYPEKEYS.SET_VALIDATIONS,
  payload: validations,
});
