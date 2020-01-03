import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { IprojectNameValidationConfig } from "../../reducers/wizardSelectionReducers/setValidations";

import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES
} from "../../utils/constants";

export interface IStateValidationProjectName {
  isValid:boolean;
  errorMessage:string;
}

const errorMessageEmptyName:string = "Project name is required";
const errorMessageReservedName:string = "Project name is reserved";

export const validateProjectName = (projectName:string, outputPath:string,
  validations:IprojectNameValidationConfig, vscode: IVSCodeObject):Promise<IStateValidationProjectName> => {

  let promise = new Promise<IStateValidationProjectName>((resolve) => {
    let isEmpty = validations.validateEmptyNames==true && projectName=="";
    let isExistingName = validations.validateExistingNames==true && projectName!="" &&
    outputPath !="";
    let isReservedName = validations.reservedNames.filter(name => name.toLowerCase() === projectName.toLowerCase()).length>0;

    const listPromise:Array<Promise<IStateValidationProjectName>>=[];

      let promiseIsEmpty = new Promise<IStateValidationProjectName>((resolveIsEmpty) => {
        if (isEmpty){
          resolveIsEmpty({isValid:false, errorMessage:errorMessageEmptyName});
        }else{
          resolveIsEmpty({isValid:true, errorMessage:""});
        }
      });
      listPromise.push(promiseIsEmpty);

      let promiseIsExistingName = new Promise<IStateValidationProjectName>((resolveIsExistingName) => {
        if (isExistingName){
          const callbackListenerPathValidation = (event:any) =>{
            const message = event.data;
            if (message.command == EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION){
                resolveIsExistingName({isValid:message.payload.projectPathValidation.isValid,
                  errorMessage:message.payload.projectPathValidation.error});
            }
          }
          window.removeEventListener("message",callbackListenerPathValidation);
          window.addEventListener("message", callbackListenerPathValidation);

          vscode.postMessage({
            module: EXTENSION_MODULES.VALIDATOR,
            command: EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION,
            track: false,
            projectPath: outputPath,
            projectName: projectName
          });
        }else{
          resolveIsExistingName({isValid:true, errorMessage:""});
        }
      });
      listPromise.push(promiseIsExistingName);

      let promiseIsRservedName = new Promise<IStateValidationProjectName>((resolveIsReservedName) => {
        if (isReservedName){
          resolveIsReservedName({isValid:false, errorMessage:errorMessageReservedName});
        }else{
          resolveIsReservedName({isValid:true, errorMessage:""});
        }
      });
      listPromise.push(promiseIsRservedName);

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