
import { addRequiredValidate, IValidation, addExistingItemNameValidate, 
  addExistingProjectNameValidate, addReservedNameValidate, addRegexValidate } from "./validations";
import { ISelected } from "../../types/selected";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";

describe("validations", () => {
  describe("require", () => {

    it("empty",()=>{
      const validate: IValidation = addRequiredValidate("")
      expect(validate.isValid).toBeFalsy();
    });

    it("not empty",()=>{
      const validate: IValidation = addRequiredValidate("project1")
      expect(validate.isValid).toBeTruthy();
    });
  });

  describe("reserved names", () => {
    it("exist",()=>{
      const validate: IValidation = addReservedNameValidate("reserve1",["reserve1"])
      expect(validate.isValid).toBeFalsy();
    });

    it("not exist",()=>{
      const validate: IValidation = addReservedNameValidate("reserve1",["reserve2"])
      expect(validate.isValid).toBeTruthy();
    });
  });

  describe("regex", () => {
    it("valid",()=>{
      const validate: IValidation = addRegexValidate("$project1",[{
        "name" : "nameStartWith$",
        "pattern" : "^[^\\$]"
      }])
      expect(validate.isValid).toBeTruthy();
    });

    it("not valid",()=>{
      const validate: IValidation = addRegexValidate("project1",[{
        "name" : "nameStartWith$",
        "pattern" : "^[^\\$]"
      }])
      expect(validate.isValid).toBeTruthy();
    });
  });
  
});

describe("validations project", () => {
  describe("exist project name", () => {
    it("exist",()=>{
      const postMessage = jest.fn();
      const mockVsCode: IVSCodeObject = { postMessage };

      addExistingProjectNameValidate("dfg","dfgdf",mockVsCode);
      expect(postMessage).toHaveBeenCalled();
    });
  });

  describe("exist project name", () => {
    it("exist",()=>{
      const postMessage = jest.fn();
      const mockVsCode: IVSCodeObject = { postMessage };

      addExistingProjectNameValidate("","",mockVsCode);
      expect(postMessage).toHaveBeenCalledTimes(0);
    });
  });
});
describe("validations item", () => {
  describe("exist item name", () => {
    let items: Array<ISelected>;
    beforeEach(()=>{
      items = [{internalName:"Blank",title:"item1"}];
    });

    it("exist",()=>{
      items.push({internalName:"Blank",title:"item1"});
      const validate: IValidation = addExistingItemNameValidate("item1", items)
      expect(validate.isValid).toBeFalsy();
    });

    it("not exist",()=>{
      items.push({internalName:"Blank",title:"item2"});
      const validate: IValidation = addExistingItemNameValidate("item2", items)
      expect(validate.isValid).toBeTruthy();
    });
  });
});