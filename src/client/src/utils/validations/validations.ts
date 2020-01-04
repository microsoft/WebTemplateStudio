import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { IprojectNameValidationConfig, IRegex } from "../../reducers/wizardSelectionReducers/setValidations";

import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES
} from "../../utils/constants";

export interface IStateValidationProjectName {
  isValid:boolean;
  errorMessage:string;
}

const errorMessageRequired:string = "Project name is required";
const errorMessageReservedName:string = "Project name is reserved";
const errorMessageProjectStartWith$ = "Project start with $";

export const addRequiredValidate = (projectName:string, validations:IprojectNameValidationConfig) =>{
  let promiseRequired = new Promise<IStateValidationProjectName>((resolveIsEmpty) => {
    let isEmpty = validations.validateEmptyNames==true && projectName=="";
    if (isEmpty){
      resolveIsEmpty({isValid:false, errorMessage:errorMessageRequired});
    }else{
      resolveIsEmpty({isValid:true, errorMessage:""});
    }
  });
  return promiseRequired;
}

export const addExistingNameValidate = (projectName:string, outputPath:string,
  validations:IprojectNameValidationConfig, vscode: IVSCodeObject) =>{
  let promiseIsExistingName = new Promise<IStateValidationProjectName>((resolveIsExistingName) => {
    let isExistingName = validations.validateExistingNames==true && projectName!="" &&
outputPath !="";
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
  return promiseIsExistingName;
}


export const addReservedNameValidate = (projectName:string,
  validations:IprojectNameValidationConfig) =>{
  let promiseIsReservedName = new Promise<IStateValidationProjectName>((resolveIsReservedName) => {
    let isReservedName = validations.reservedNames.filter(name => name.toLowerCase() === projectName.toLowerCase()).length>0;
    if (isReservedName){
      resolveIsReservedName({isValid:false, errorMessage:errorMessageReservedName});
    }else{
      resolveIsReservedName({isValid:true, errorMessage:""});
    }
  });
  return promiseIsReservedName;
}

export const addRegexValidate = (projectName:string,
  validations:IprojectNameValidationConfig)=>{
  let promiseHasRegex = new Promise<IStateValidationProjectName>((resolveHasRegex) => {
    const getInvalidRegex = ()=>{
      let regexs:Array<IRegex> = validations.regexs.filter(regex =>{
        let regObj = new RegExp(regex.pattern.toString());
        let isValid = regObj.test(projectName);
        return !isValid;
      })
      return regexs;
    }
    let hasInvalidRegex = getInvalidRegex().length>0;

    if (hasInvalidRegex){
      let firstInvalidRegex = getInvalidRegex()[0];
      if (firstInvalidRegex.name === "projectStartWith$")
        resolveHasRegex({isValid:false, errorMessage:errorMessageProjectStartWith$});
    }else{
      resolveHasRegex({isValid:true, errorMessage:""});
    }
  });
  return promiseHasRegex;
}