import { IprojectNameValidationConfig, IitemNameValidationConfig } from "../reducers/wizardSelectionReducers/setValidations";

export const getProjectConfigurationValidations = (): IprojectNameValidationConfig => {
  const configuration: IprojectNameValidationConfig = {
    regexs:[],
    reservedNames:[],
    validateEmptyNames:true,
    validateExistingNames:false
  };
  return configuration;
};

export const getItemConfigurationValidations = (): IitemNameValidationConfig => {
  const configuration: IitemNameValidationConfig = {
    regexs:[],
    reservedNames:[],
    validateDefaultNames:false,
    validateEmptyNames:true,
    validateExistingNames:true
  };
  return configuration;
};