import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { IprojectNameValidationConfig } from "../../reducers/wizardSelectionReducers/setValidations";
import { addExistingNameValidate, addRegexValidate, addRequiredValidate, addReservedNameValidate} from './validations';

export interface IStateValidationProjectName {
  isValid:boolean;
  errorMessage:string;
}

export const validateProjectName = (projectName:string, outputPath:string,
  validations:IprojectNameValidationConfig, vscode: IVSCodeObject):Promise<IStateValidationProjectName> => {

  let promise = new Promise<IStateValidationProjectName>((resolve) => {
    const listPromise:Array<Promise<IStateValidationProjectName>>=[];

    listPromise.push(addRequiredValidate(projectName, validations));
    listPromise.push(addExistingNameValidate(projectName,outputPath,validations,vscode));
    listPromise.push(addReservedNameValidate(projectName,validations));
    listPromise.push(addRegexValidate(projectName, validations));

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