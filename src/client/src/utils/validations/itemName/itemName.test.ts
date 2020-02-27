jest.mock('../validations',()=>{return {
  addRequiredValidate:jest.fn(() => {
    return {isValid:true, error:""};
  }),
  addExistingItemNameValidate:jest.fn(() => {
    return {isValid:true, error:""};
  }),
  addRegexValidate:jest.fn(() => {
    return {isValid:true, error:""};
  }),
  addReservedNameValidate:jest.fn(() => {
    return {isValid:true, error:""};
  })
}});
import { validateItemName } from "./itemName";
import { IitemNameValidationConfig } from "../../../reducers/wizardSelectionReducers/setValidations";
import { addRequiredValidate, addExistingItemNameValidate, addRegexValidate,
  addReservedNameValidate } from '../validations';

describe("validate", () => {
  it("config validate",(resolve)=>{
    const validations: IitemNameValidationConfig = {
      regexs:[],
      reservedNames:[],
      validateEmptyNames:false,
      validateExistingNames:false,
      validateDefaultNames:false
    }
    validateItemName("dfgfd",validations,[]).then(()=>{
      expect(addRequiredValidate).toHaveBeenCalledTimes(0);
      expect(addExistingItemNameValidate).toHaveBeenCalledTimes(0);
      expect(addRegexValidate).toHaveBeenCalledTimes(0);
      expect(addReservedNameValidate).toHaveBeenCalledTimes(0);
      resolve();
    });
  });
    it("config no validate",(resolve)=>{
    const validations: IitemNameValidationConfig = {
      regexs:[{
        "name" : "nameStartWith$",
        "pattern" : "^[^\\$]"
      }],
      reservedNames:["111"],
      validateEmptyNames:true,
      validateExistingNames:true,
      validateDefaultNames:true
    }
    validateItemName("dfgfd",validations,[]).then(()=>{
      expect(addRequiredValidate).toHaveBeenCalledTimes(1);
      expect(addExistingItemNameValidate).toHaveBeenCalledTimes(1);
      expect(addRegexValidate).toHaveBeenCalledTimes(1);
      expect(addReservedNameValidate).toHaveBeenCalledTimes(1);
      resolve();
    });
  });
});