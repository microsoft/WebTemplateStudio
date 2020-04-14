import { CONFIG_TYPEKEYS } from "../configTypeKeys";


export interface IProjectPathValidationAction {
  type: CONFIG_TYPEKEYS.SET_PROJECT_PATH_VALIDATION;
  payload: any; //FIXME: Type is declared in future PR in validation reducer, replace when merged
}

export interface IValidationsAction {
  type: CONFIG_TYPEKEYS.SET_VALIDATIONS;
  payload: any; //FIXME: Type is declared in future PR in validation reducer, replace when merged
}

export interface IRegex {
  name: string;
  pattern: string;
}

export interface IprojectNameValidationConfig {
  regexs: Array<IRegex>;
  reservedNames: Array<string>;
  validateEmptyNames: boolean;
  validateExistingNames: boolean;
}

export interface IitemNameValidationConfig {
  regexs: Array<IRegex>;
  reservedNames: Array<string>;
  validateEmptyNames: boolean;
  validateExistingNames: boolean;
  validateDefaultNames: boolean;
}

export interface IValidations {
  itemNameValidationConfig: IitemNameValidationConfig;
  projectNameValidationConfig: IprojectNameValidationConfig;
}