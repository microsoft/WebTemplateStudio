import { IVSCodeObject } from "../../../reducers/vscodeApiReducer";
import { IprojectNameValidationConfig } from "../../../reducers/wizardSelectionReducers/setValidations";
import { addExistingProjectNameValidate, addRegexValidate, addRequiredValidate, 
  addReservedNameValidate, IValidation} from '../validations';
import { validationMessages } from '../messages';


export const validateProjectName = async (projectName: string, outputPath: string,
  validations: IprojectNameValidationConfig, vscode: IVSCodeObject) => {

  const listValidations: Array<IValidation>=[];
  let validate: IValidation = {isValid:true,error:validationMessages.default};
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