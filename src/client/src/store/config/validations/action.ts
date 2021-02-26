import { IValidation } from "../../../utils/validations/validations";
import { CONFIG_TYPEKEYS } from "../configTypeKeys";
import { IProjectPathValidationAction, IValidationsAction } from "./model";

export const setProjectPathValidationAction = (validation: IValidation): IProjectPathValidationAction => ({
  type: CONFIG_TYPEKEYS.SET_PROJECT_PATH_VALIDATION,
  payload: validation,
});

export const setValidationsAction = (validations: IValidation[]): IValidationsAction => ({
  type: CONFIG_TYPEKEYS.SET_VALIDATIONS,
  payload: validations,
});
