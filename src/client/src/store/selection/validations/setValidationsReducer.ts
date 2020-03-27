import WizardSelectionActionType from "../selectionActionType";
import { WIZARD_SELECTION_TYPEKEYS } from "../typeKeys";
import { IValidations } from "./model";

const initialState = {
  itemNameValidationConfig: {
    "regexs" : [],
    "reservedNames" : [],
    "validateEmptyNames": true,
    "validateExistingNames": true,
    "validateDefaultNames": true
  },
  projectNameValidationConfig:{
    "regexs" : [],
    "reservedNames" : [],
    "validateEmptyNames": true,
    "validateExistingNames": true
  }
};

const validationsReducer = (
  state: IValidations = initialState,
  action: WizardSelectionActionType
) => {
  switch (action.type) {
    case WIZARD_SELECTION_TYPEKEYS.SET_VALIDATIONS:
      return action.payload;
    default:
      return state;
  }
};

export default validationsReducer;
