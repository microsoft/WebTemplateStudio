import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { IRegex } from "../../reducers/wizardSelectionReducers/setValidations";
import { ISelected } from "../../types/selected";
import { FormattedMessage } from "react-intl";

import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES
} from "../../utils/constants";
import {projectPathValidation} from "../extensionService/extensionService";

export interface IValidation {
  isValid: boolean;
  error: string | FormattedMessage.MessageDescriptor;
}

const errorMessageRequired:string = "Project name is required";
const errorMessageReservedName:string = "Project name is reserved";
const errorMessageProjectStartWith$ = "Project start with $";
const errorMessagePageNameExist = "The page exist";

export const addRequiredValidate = (name:string) =>{
  let validate:IValidation = {isValid:true, error:""};
  let isEmpty = name === "";
  if (isEmpty) validate = {isValid:false, error:errorMessageRequired};
  return validate;
}

export const addExistingItemNameValidate = (pageTitle:string, selectedPages:Array<ISelected>) =>{
  let validate:IValidation = {isValid:true, error:""};
  let existPage = selectedPages.filter(page => page.title.toLowerCase()==pageTitle.toLowerCase()).length > 1;
  if (existPage) validate = {isValid:false, error:errorMessagePageNameExist};
  return validate;
}

export const addExistingProjectNameValidate = async (projectName:string, outputPath:string,
  vscode: IVSCodeObject) =>{
  let validate:IValidation = {isValid:true, error:""};
  let isExistingName = projectName!="" && outputPath !="";

  if (isExistingName){
    const event:any = await projectPathValidation({
      module: EXTENSION_MODULES.VALIDATOR,
      command: EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION,
      track: false,
      projectPath: outputPath,
      projectName: projectName
    }, vscode);

    validate = event.data.payload.projectPathValidation;
  }
  return validate;
}

export const addReservedNameValidate = (name:string,
  reservedNames:Array<string>) =>{
  let validate:IValidation = {isValid:true, error:""};
  let isReservedName = reservedNames.filter(nameReserve => nameReserve.toLowerCase() === name.toLowerCase()).length>0;
  if (isReservedName) validate = {isValid:false, error:errorMessageReservedName};

  return validate;
}

export const addRegexValidate = (name:string,
  regexs:Array<IRegex>)=>{
  let validate:IValidation = {isValid:true, error:""};
  const getInvalidRegex = ()=>{
    let regexsFiltered:Array<IRegex> = regexs.filter(regex =>{
      let regObj = new RegExp(regex.pattern.toString());
      let isValid = regObj.test(name);
      return !isValid;
    })
    return regexsFiltered;
  }
  let hasInvalidRegex = getInvalidRegex().length>0;

  if (hasInvalidRegex){
    let firstInvalidRegex = getInvalidRegex()[0];
    if (firstInvalidRegex.name === "projectStartWith$")
    validate = {isValid:false, error:errorMessageProjectStartWith$};
  }
  return validate;
}