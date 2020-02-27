import { WIZARD_SELECTION_TYPEKEYS } from "../../actions/wizardSelectionActions/typeKeys";
import { IValidation } from "../../utils/validations/validations";
import { validationMessages } from "../../utils/validations/messages";
import WizardSelectionActionType from "../../actions/wizardSelectionActions/wizardSelectionActionType";

export interface IProjectName {
  projectName: string;
  validation: IValidation;
}

const initialState = {
  projectName: "",
  validation: {
    isValid: false,
    error: validationMessages.default,
    isDirty:false
  }
};

const projectNameReducer = (
  state: IProjectName = initialState,
  action: WizardSelectionActionType
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.UPDATE_PROJECT_NAME:
      return action.payload;
    default:
      return state;
  }
};

export default projectNameReducer;
