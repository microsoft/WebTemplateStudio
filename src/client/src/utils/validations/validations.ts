import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { IRegex } from "../../reducers/wizardSelectionReducers/setValidations";
import { ISelected } from "../../types/selected";
import { FormattedMessage } from "react-intl";
import { validationMessages } from './messages';

import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES
} from "../constants";
import {projectPathValidation} from "../extensionService/extensionService";

export interface IValidation {
  isValid: boolean;
  error: FormattedMessage.MessageDescriptor;
  isDirty?:boolean;
}

export const addRequiredValidate = (name:string) =>{
  let validate:IValidation = {isValid:true, error:validationMessages.default};
  let isEmpty = name === "";
  if (isEmpty) validate = {isValid:false, error:validationMessages.emptyName};
  return validate;
}

export const addExistingItemNameValidate = (pageTitle:string, selectedPages:Array<ISelected>) =>{
  let validate:IValidation = {isValid:true, error:validationMessages.default};
  let existPage = selectedPages.filter(page => page.title.toLowerCase()==pageTitle.toLowerCase()).length > 1;
  if (existPage) validate = {isValid:false, error:validationMessages.duplicateItemName};
  return validate;
}

export const addExistingProjectNameValidate = async (projectName:string, outputPath:string,
  vscode: IVSCodeObject) =>{
  let validate:IValidation = {isValid:true, error:validationMessages.default};
  let isExistingName = projectName!="" && outputPath !="";

  if (isExistingName){
    const event:any = await projectPathValidation(outputPath,projectName, vscode);
    validate = event.data.payload.projectPathValidation;
    validate.error = validationMessages.duplicateProjectName;
  }
  return validate;
}

export const addReservedNameValidate = (name:string,
  reservedNames:Array<string>) =>{
  let validate:IValidation = {isValid:true, error:validationMessages.default};
  let isReservedName = reservedNames.filter(nameReserve => nameReserve.toLowerCase() === name.toLowerCase()).length>0;
  if (isReservedName) validate = {isValid:false, error:validationMessages.reservedName};

  return validate;
}

export const addRegexValidate = (name:string, regexs:Array<IRegex>):IValidation=>{
  let validate:IValidation = {isValid:true, error:validationMessages.default};
  const getInvalidRegex = ()=>{
    let regexsFiltered:Array<IRegex> = regexs.filter(regex =>{
      let regObj = new RegExp(regex.pattern.toString());
      let containInvalidCarachter = regObj.test(name);
      return containInvalidCarachter === false;
    })
    return regexsFiltered;
  }
  if (name!=""){
    let hasInvalidRegex = getInvalidRegex().length>0;

    if (hasInvalidRegex){
      let firstInvalidRegex = getInvalidRegex()[0];
      if (firstInvalidRegex.name === "nameStartLetter") validate = {isValid:false, error:validationMessages.nameStartLetter};
      if (firstInvalidRegex.name === "nameContainLettersNumbersDashes") validate = {isValid:false, error:validationMessages.nameContainLettersNumbersDashes};
    }
  }
  return validate;
}