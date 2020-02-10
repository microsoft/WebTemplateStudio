import { inferItemName } from './itemName';
import { ISelected } from "../../types/selected";

describe("validate infer name", () => {
  it("is not same",()=>{
    let selected:ISelected = {title:"t1", internalName:"Blank"};

    const newName:string = inferItemName("t2",[selected]);
    expect(newName!=="").toBeTruthy();
    
  });

  it("is same",()=>{
    let selected:ISelected = {title:"t1", internalName:"Blank"};

    const newName:string = inferItemName("t1",[selected]);
    expect(newName !== "").toBeTruthy();
  
  });
});