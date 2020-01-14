jest.mock('./validations');
import { validateProjectName } from "./projectName";
import { IprojectNameValidationConfig } from "../../reducers/wizardSelectionReducers/setValidations";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { addRequiredValidate, addExistingProjectNameValidate, addRegexValidate,
  addReservedNameValidate } from './validations';
import { resolve } from "url";

describe("validate", () => {
  
  let mockVsCode:IVSCodeObject;
  
  beforeEach(()=>{
    
  });

  describe("require", () => {
    it("config validate",(resolve)=>{
      let validations:IprojectNameValidationConfig = {
        regexs:[],
        reservedNames:[],
        validateEmptyNames:false,
        validateExistingNames:false
      }
      validateProjectName("dfgfd","sdfsdf",validations,mockVsCode).then(()=>{
        expect(addRequiredValidate).toHaveBeenCalledTimes(0);
        expect(addExistingProjectNameValidate).toHaveBeenCalledTimes(0);
        expect(addRegexValidate).toHaveBeenCalledTimes(0);
        expect(addReservedNameValidate).toHaveBeenCalledTimes(0);
        resolve();
      });
      
    });
    it("config no validate",()=>{
      let validations:IprojectNameValidationConfig = {
        regexs:[{
          "name" : "projectStartWith$",
          "pattern" : "^[^\\$]"
        }],
        reservedNames:["111"],
        validateEmptyNames:true,
        validateExistingNames:true
      }
      validateProjectName("dfg","sdfsdf",validations,mockVsCode)
        expect(addRequiredValidate).toHaveBeenCalled();
        expect(addExistingProjectNameValidate).toHaveBeenCalled();
        //expect(addRegexValidate).toHaveBeenCalled();
        //expect(addReservedNameValidate).toHaveBeenCalled();
    });
  });
});