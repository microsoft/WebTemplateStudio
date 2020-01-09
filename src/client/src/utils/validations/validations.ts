import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { IRegex } from "../../reducers/wizardSelectionReducers/setValidations";
import { ISelected } from "../../types/selected";

import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES
} from "../../utils/constants";
import {postMessageAsync} from "../extensionService";

export interface IStateValidationProjectName {
  isValid:boolean;
  errorMessage:string;
}

const errorMessageRequired:string = "Project name is required";
const errorMessageReservedName:string = "Project name is reserved";
const errorMessageProjectStartWith$ = "Project start with $";
const errorMessagePageNameExist = "The page exist";

export const addRequiredValidate = (projectName:string) =>{
  let validate:IStateValidationProjectName = {isValid:true, errorMessage:""};
  let isEmpty = projectName=="";
  if (isEmpty) validate = {isValid:false, errorMessage:errorMessageRequired};
  return validate;
}

export const addExistingItemNameValidate = (pageTitle:string, selectedPages:Array<ISelected>) =>{
  let validate:IStateValidationProjectName = {isValid:true, errorMessage:""};
  let existPage = selectedPages.filter(page => page.title==pageTitle).length > 1;
  if (existPage) validate = {isValid:false, errorMessage:errorMessagePageNameExist};
  return validate;
}

export const addExistingProjectNameValidate = async (projectName:string, outputPath:string,
  vscode: IVSCodeObject) =>{
  let validate:IStateValidationProjectName = {isValid:true, errorMessage:""};
  let isExistingName = projectName!="" && outputPath !="";
  if (isExistingName){
    const event:any = await postMessageAsync(EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION, {
      module: EXTENSION_MODULES.VALIDATOR,
      command: EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION,
      track: false,
      projectPath: outputPath,
      projectName: projectName
    }, vscode);

    const message = event.data;
    validate = {isValid:message.payload.projectPathValidation.isValid,
      errorMessage:message.payload.projectPathValidation.error};
  }else{
    validate = {isValid:true, errorMessage:""};
  }
  return validate;
}

export const addReservedNameValidate = (projectName:string,
  reservedNames:Array<string>) =>{
  let validate:IStateValidationProjectName = {isValid:true, errorMessage:""};
  let isReservedName = reservedNames.filter(name => name.toLowerCase() === projectName.toLowerCase()).length>0;
  if (isReservedName) validate = {isValid:false, errorMessage:errorMessageReservedName};

  return validate;
}

export const addRegexValidate = (projectName:string,
  regexs:Array<IRegex>)=>{
  let validate:IStateValidationProjectName = {isValid:true, errorMessage:""};
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
    validate = {isValid:false, errorMessage:errorMessageProjectStartWith$};
  }
  return validate;
}