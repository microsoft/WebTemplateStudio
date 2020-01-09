import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { IprojectNameValidationConfig } from "../../reducers/wizardSelectionReducers/setValidations";
import { addExistingProjectNameValidate, addRegexValidate, addRequiredValidate, addReservedNameValidate} from './validations';

export interface IStateValidationProjectName {
  isValid:boolean;
  errorMessage:string;
}

export const validateProjectName = async (projectName:string, outputPath:string,
  validations:IprojectNameValidationConfig, vscode: IVSCodeObject) => {

  let listValidations:Array<IStateValidationProjectName>=[];
  let validate:IStateValidationProjectName = {isValid:true,errorMessage:""};
  if (validations.validateEmptyNames)
    listValidations.push(addRequiredValidate(projectName));
  if (validations.validateExistingNames)
    listValidations.push(await addExistingProjectNameValidate(projectName, outputPath, vscode));
  if (validations.reservedNames.length>0)
    listValidations.push(addReservedNameValidate(projectName, validations.reservedNames));
  if (validations.regexs.length>0)
    listValidations.push(addRegexValidate(projectName, validations.regexs));

  const invalids = listValidations.filter(validate=>validate.isValid===false);
  if (invalids.length>0) validate = invalids[0];

  return validate;
};