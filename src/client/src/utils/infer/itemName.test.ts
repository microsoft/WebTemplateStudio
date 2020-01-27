import { inferItemName } from './itemName';
import { ISelected } from "../../types/selected";

describe("validate infer name", () => {
  it("is not same",()=>{
    let selected:ISelected = {title:"t1", internalName:"Blank"};

    inferItemName("t2",[selected]).then((newName:string)=>{
      expect(newName!=="").toBeTruthy();
    });
  });

  it("is same",()=>{
    let selected:ISelected = {title:"t1", internalName:"Blank"};

    inferItemName("t1",[selected]).then((newName:string)=>{
      expect(newName === "").toBeTruthy();
    });
  });
});