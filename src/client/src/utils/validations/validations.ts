import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { IRegex } from "../../reducers/wizardSelectionReducers/setValidations";
import { ISelected } from "../../types/selected";

import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES
} from "../../utils/constants";
import {postMessage} from "../serviceExtension";

export interface IStateValidationProjectName {
  isValid:boolean;
  errorMessage:string;
}

const errorMessageRequired:string = "Project name is required";
const errorMessageReservedName:string = "Project name is reserved";
const errorMessageProjectStartWith$ = "Project start with $";
const errorMessagePageNameExist = "The page exist";

export const addRequiredValidate = (projectName:string) =>{
  let promiseRequired = new Promise<IStateValidationProjectName>((resolveIsEmpty) => {
    let isEmpty = projectName=="";
    if (isEmpty){
      resolveIsEmpty({isValid:false, errorMessage:errorMessageRequired});
    }else{
      resolveIsEmpty({isValid:true, errorMessage:""});
    }
  });
  return promiseRequired;
}

export const addExistingItemNameValidate = (pageTitle:string, selectedPages:Array<ISelected>) =>{
  let promiseRequired = new Promise<IStateValidationProjectName>((resolveExistPage) => {
    let existPage = selectedPages.filter(page => page.title==pageTitle).length > 1;
    if (existPage){
      resolveExistPage({isValid:false, errorMessage:errorMessagePageNameExist});
    }else{
      resolveExistPage({isValid:true, errorMessage:""});
    }
  });
  return promiseRequired;
}

export const addExistingProjectNameValidate = (projectName:string, outputPath:string,
  vscode: IVSCodeObject) =>{
  let promiseIsExistingName = new Promise<IStateValidationProjectName>((resolve) => {
    let isExistingName = projectName!="" && outputPath !="";
    if (isExistingName){
      postMessage(EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION, {
        module: EXTENSION_MODULES.VALIDATOR,
        command: EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION,
        track: false,
        projectPath: outputPath,
        projectName: projectName
      }, vscode).then((event:any)=>{
        const message = event.data;
        resolve({isValid:message.payload.projectPathValidation.isValid,
          errorMessage:message.payload.projectPathValidation.error});
      })
    }else{
      resolve({isValid:true, errorMessage:""});
    }
  });
  return promiseIsExistingName;
}

export const addReservedNameValidate = (projectName:string,
  reservedNames:Array<string>) =>{
  let promiseIsReservedName = new Promise<IStateValidationProjectName>((resolveIsReservedName) => {
    let isReservedName = reservedNames.filter(name => name.toLowerCase() === projectName.toLowerCase()).length>0;
    if (isReservedName){
      resolveIsReservedName({isValid:false, errorMessage:errorMessageReservedName});
    }else{
      resolveIsReservedName({isValid:true, errorMessage:""});
    }
  });
  return promiseIsReservedName;
}

export const addRegexValidate = (projectName:string,
  regexs:Array<IRegex>)=>{
  let promiseHasRegex = new Promise<IStateValidationProjectName>((resolveHasRegex) => {
    const getInvalidRegex = ()=>{
      let regexsFiltered:Array<IRegex> = regexs.filter(regex =>{
        let regObj = new RegExp(regex.pattern.toString());
        let isValid = regObj.test(projectName);
        return !isValid;
      })
      return regexsFiltered;
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