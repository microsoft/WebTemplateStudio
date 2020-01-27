import { WIZARD_SELECTION_TYPEKEYS } from "./typeKeys";

export interface IValidationsAction {
  type: WIZARD_SELECTION_TYPEKEYS.SET_VALIDATIONS;
  payload: any; //FIXME: Type is declared in future PR in validation reducer, replace when merged
}

export const setValidations = (
  validations: any
): IValidationsAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.SET_VALIDATIONS,
  payload: validations
});
