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

const emptyName:string = "Project name is required";

export const validateProjectName = (projectName:string, outputPath:string,
  validations:IprojectNameValidationConfig, vscode: IVSCodeObject):Promise<IStateValidationProjectName> => {
  let stateValidation:IStateValidationProjectName = {
    isValid:true,
    errorMessage:""
  };

  let promise = new Promise<IStateValidationProjectName>((resolve) => {
    let isDirtyValidation = false;
    if (validations.validateEmptyNames==true && projectName==""){
      stateValidation.isValid = false;
      stateValidation.errorMessage = emptyName;
      isDirtyValidation = true;
      resolve(stateValidation);
    }

    if (validations.validateExistingNames==true && !isDirtyValidation && projectName!="" && outputPath !=""){
      const callbackListenerPathValidation = (event:any) =>{
        const message = event.data;
        if (message.command == EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION){
            //message.payload.projectPathValidation
            stateValidation.isValid = message.payload.projectPathValidation.isValid;
            stateValidation.errorMessage = message.payload.projectPathValidation.error;
            resolve(stateValidation);
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
    }
    if (!isDirtyValidation) resolve(stateValidation);
  });
  return promise;
};