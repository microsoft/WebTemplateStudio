import { WIZARD_SELECTION_TYPEKEYS } from "../../actions/wizardSelectionActions/typeKeys";
import { IValidation } from "./updateOutputPath";
import WizardSelectionActionType from "../../actions/wizardSelectionActions/wizardSelectionActionType";

export interface IRegex {
  name:String;
  pattern:String;
}

export interface IprojectNameValidationConfig {
  regexs:Array<IRegex>;
  reservedNames:Array<string>;
  validateEmptyNames:Boolean;
  validateExistingNames:Boolean;
}

export interface InameValidationConfig {
  regexs:Array<IRegex>;
  reservedNames:Array<string>;
  validateEmptyNames:Boolean;
  validateExistingNames:Boolean;
  validateDefaultNames:Boolean;
}

export interface IValidations {
  itemNameValidationConfig:InameValidationConfig;
  projectNameValidationConfig:IprojectNameValidationConfig
}

const initialState = {
  itemNameValidationConfig: {
    "regexs" : [],
    "reservedNames" : [],
    "validateEmptyNames": true,
    "validateExistingNames": true,
    "validateDefaultNames": true
  },
  projectNameValidationConfig:{
    "regexs" : [{
      "name" : "projectStartWith$",
      "pattern" : "^[^\\$]"
    }],
    "reservedNames" : ["reserve1"],
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
