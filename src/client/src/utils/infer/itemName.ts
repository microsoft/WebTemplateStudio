import { IitemNameValidationConfig } from "../../reducers/wizardSelectionReducers/setValidations";
import { ISelected } from "../../types/selected";

export interface IStateValidationItemName {
  isValid:boolean;
  errorMessage:string;
}

export const inferItemName = async (basePageName:string, 
  selectedPages: Array<ISelected>) => {

  let suggestedName:string="", index=1;
  if (selectedPages.filter(page => page.title===basePageName).length===0){
    suggestedName = basePageName;
  }

  while (suggestedName===""){
    let exist = selectedPages.filter(page => page.title===basePageName + index.toString()).length>0;
    if (!exist){
      suggestedName = basePageName + index.toString();
    }else{
      index++;
    }
  }

  return suggestedName;
};