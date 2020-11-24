import { validationMessages } from "../../../utils/validations/messages";
import WizardSelectionActionType from "../selectionActionType";
import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import { IProjectName } from "./model";

const initialState = {
  projectName: "",
  validation: {
    isValid: false,
    error: validationMessages.default,
    isDirty: false,
  },
};

const projectNameReducer = (state: IProjectName = initialState, action: WizardSelectionActionType) => {
  switch (action.type) {
    case USERSELECTION_TYPEKEYS.SET_PROJECT_NAME:
      return action.payload;
    default:
      return state;
  }
};

export default projectNameReducer;
