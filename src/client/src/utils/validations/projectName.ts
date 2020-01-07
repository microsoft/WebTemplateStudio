import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { IprojectNameValidationConfig } from "../../reducers/wizardSelectionReducers/setValidations";
import { addExistingProjectNameValidate, addRegexValidate, addRequiredValidate, addReservedNameValidate} from './validations';

export interface IStateValidationProjectName {
  isValid:boolean;
  errorMessage:string;
}

export const validateProjectName = (projectName:string, outputPath:string,
  validations:IprojectNameValidationConfig, vscode: IVSCodeObject):Promise<IStateValidationProjectName> => {

  let promise = new Promise<IStateValidationProjectName>((resolve) => {
    const listPromise:Array<Promise<IStateValidationProjectName>>=[];

    if (validations.validateEmptyNames)
      listPromise.push(addRequiredValidate(projectName));
    if (validations.validateExistingNames)
      listPromise.push(addExistingProjectNameValidate(projectName, outputPath, vscode));
    if (validations.reservedNames.length>0)
      listPromise.push(addReservedNameValidate(projectName, validations.reservedNames));
    if (validations.regexs.length>0)
      listPromise.push(addRegexValidate(projectName, validations.regexs));

    Promise.all(listPromise).then((listResponse:Array<IStateValidationProjectName>)=>{
      let isDirtyValidation = false;

      listResponse.forEach((stateValidate)=>{
        if (!isDirtyValidation && !stateValidate.isValid){
          isDirtyValidation=true;
          resolve(stateValidate);
        }
      });
      if (!isDirtyValidation) resolve({isValid:true,errorMessage:""});
    })
  });
  return promise;
};