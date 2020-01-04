import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { IitemNameValidationConfig } from "../../reducers/wizardSelectionReducers/setValidations";
import { addExistingNameValidate, addRegexValidate, addRequiredValidate, addReservedNameValidate} from './validations';

export interface IStateValidationItemName {
  isValid:boolean;
  errorMessage:string;
}

export const validateItemName = (itemName:string, 
  validations:IitemNameValidationConfig):Promise<IStateValidationItemName> => {

  let promise = new Promise<IStateValidationItemName>((resolve) => {
    const listPromise:Array<Promise<IStateValidationItemName>>=[];

    if (validations.validateEmptyNames)
      listPromise.push(addRequiredValidate(itemName));
    //if (validations.validateExistingNames)
    //  listPromise.push(addExistingNameValidate(itemName, outputPath, vscode));
    if (validations.reservedNames.length>0)
      listPromise.push(addReservedNameValidate(itemName, validations.reservedNames));
    if (validations.regexs.length>0)
      listPromise.push(addRegexValidate(itemName, validations.regexs));

    Promise.all(listPromise).then((listResponse:Array<IStateValidationItemName>)=>{
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