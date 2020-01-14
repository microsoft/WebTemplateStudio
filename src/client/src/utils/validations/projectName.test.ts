jest.mock('./validations');
import { validateProjectName } from "./projectName";
import { IprojectNameValidationConfig } from "../../reducers/wizardSelectionReducers/setValidations";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { addRequiredValidate, addExistingProjectNameValidate, addRegexValidate } from './validations';

describe("validate", () => {
  let validations:IprojectNameValidationConfig;
  let mockVsCode:IVSCodeObject;
  
  beforeEach(()=>{
    validations = {
      regexs:[],
      reservedNames:[],
      validateEmptyNames:false,
      validateExistingNames:false
    }
  });

  describe("require", () => {
    it("config validate",()=>{
      validateProjectName("dfgfd","sdfsdf",validations,mockVsCode);
      expect(addRequiredValidate).toHaveBeenCalledTimes(0);
      expect(addExistingProjectNameValidate).toHaveBeenCalledTimes(0);
      expect(addRegexValidate).toHaveBeenCalledTimes(0);
    });
    it("config no validate",()=>{
      validations.validateEmptyNames = true;
      validations.validateExistingNames = true;
      validations.regexs.push({
        "name" : "projectStartWith$",
        "pattern" : "^[^\\$]"
      });
      validateProjectName("dfg","sdfsdf",validations,mockVsCode);
      expect(addRequiredValidate).toHaveBeenCalled();
      expect(addExistingProjectNameValidate).toHaveBeenCalled();
      //expect(addRegexValidate).toHaveBeenCalled();
    });
  });
});