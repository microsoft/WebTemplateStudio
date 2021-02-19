import { IVSCodeObject } from "../../../types/vscode";
import * as validations from "../validations";
import { validationMessages } from "../messages";
import { IprojectNameValidationConfig } from "../../../store/config/validations/model";

export const validateProjectName = async (
  projectName: string,
  outputPath: string,
  validationConfig: IprojectNameValidationConfig,
  vscode: IVSCodeObject
) : Promise<validations.IValidation> => {
  const listValidations: Array<validations.IValidation> = [];
  let validate: validations.IValidation = { isValid: true, error: validationMessages.default };
  if (validationConfig.validateEmptyNames) listValidations.push(validations.addRequiredValidate(projectName));
  if (validationConfig.validateExistingNames)
    listValidations.push(await validations.addExistingProjectNameValidate(projectName, outputPath, vscode));
  if (validationConfig.reservedNames.length > 0)
    listValidations.push(validations.addReservedNameValidate(projectName, validationConfig.reservedNames));
  if (validationConfig.regexs.length > 0)
    listValidations.push(validations.addRegexValidate(projectName, validationConfig.regexs));

  const invalids = listValidations.filter((validate) => validate.isValid === false);
  if (invalids.length > 0) validate = invalids[0];

  return validate;
};
