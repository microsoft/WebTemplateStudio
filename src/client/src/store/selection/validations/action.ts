import { WIZARD_SELECTION_TYPEKEYS } from "../../../actions/wizardSelectionActions/typeKeys";
import { IProjectPathValidationAction } from "./model";

export const setProjectPathValidation = (
  validation: any
): IProjectPathValidationAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.SET_PROJECT_PATH_VALIDATION,
  payload: validation
});