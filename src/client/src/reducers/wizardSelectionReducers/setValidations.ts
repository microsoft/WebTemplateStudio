import { WIZARD_SELECTION_TYPEKEYS } from "../../actions/wizardSelectionActions/typeKeys";
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

export interface IitemNameValidationConfig {
  regexs:Array<IRegex>;
  reservedNames:Array<string>;
  validateEmptyNames:Boolean;
  validateExistingNames:Boolean;
  validateDefaultNames:Boolean;
}

export interface IValidations {
  itemNameValidationConfig:IitemNameValidationConfig;
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
    "regexs" : [],
    "reservedNames" : [],
    "validateEmptyNames": true,
    "validateExistingNames": true
  }
};

/*{
  "name":"nameContainLettersNumbersDashes",
  "pattern":"!^[A-Za-z][A-Za-z0-9_-]"
}*/

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
