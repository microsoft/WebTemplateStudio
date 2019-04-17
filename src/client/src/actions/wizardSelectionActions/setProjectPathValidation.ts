import { WIZARD_SELECTION_TYPEKEYS } from "./typeKeys";

export interface IProjectPathValidationAction {
  type: WIZARD_SELECTION_TYPEKEYS.SET_PROJECT_PATH_VALIDATION;
  payload: any; //FIXME: Type is declared in future PR in validation reducer, replace when merged
}

export const setProjectPathValidation = (
  validation: any
): IProjectPathValidationAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.SET_PROJECT_PATH_VALIDATION,
  payload: validation
});
