jest.mock('../validations',()=>{return {
  addRequiredValidate:jest.fn(() => {
    return {isValid:true, error:""};
  }),
  addExistingProjectNameValidate:jest.fn(() => {
    return {isValid:true, error:""};
  }),
  addRegexValidate:jest.fn(() => {
    return {isValid:true, error:""};
  }),
  addReservedNameValidate:jest.fn(() => {
    return {isValid:true, error:""};
  })
}});
import { validateProjectName } from "./projectName";
import { IprojectNameValidationConfig } from "../../../reducers/wizardSelectionReducers/setValidations";
import { IVSCodeObject } from "../../../reducers/vscodeApiReducer";
import { addRequiredValidate, addExistingProjectNameValidate, addRegexValidate,
  addReservedNameValidate } from '../validations';

describe("validate", () => {
  it("config validate",(resolve)=>{
    const postMessage = jest.fn();
    const mockVsCode: IVSCodeObject = { postMessage };
    const validations: IprojectNameValidationConfig = {
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
  it("config no validate",(resolve)=>{
    const postMessage = jest.fn();
    const mockVsCode: IVSCodeObject = { postMessage };
    const validations: IprojectNameValidationConfig = {
      regexs:[{
        "name" : "nameStartWith$",
        "pattern" : "^[^\\$]"
      }],
      reservedNames:["111"],
      validateEmptyNames:true,
      validateExistingNames:true
    }
    validateProjectName("dfgfd","sdfsdf",validations,mockVsCode).then(()=>{
      expect(addRequiredValidate).toHaveBeenCalledTimes(1);
      expect(addExistingProjectNameValidate).toHaveBeenCalledTimes(1);
      expect(addRegexValidate).toHaveBeenCalledTimes(1);
      expect(addReservedNameValidate).toHaveBeenCalledTimes(1);
      resolve();
    });
  });
});