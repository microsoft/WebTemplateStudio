import { inferProjectName } from './projectName';
import { ISelected } from "../../types/selected";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import {
  EXTENSION_COMMANDS
} from "../constants";

describe("validate infer name", () => {
  xit("is not same",(resolve)=>{
    let mockVsCode:IVSCodeObject;
    let callbackExtension:Function;
    let mockCallbackProjectPathValidation:Object = {};

    const postMessage= (message: any) =>{
      callbackExtension(mockCallbackProjectPathValidation);
    }
    mockCallbackProjectPathValidation = {
      data:{
        command:EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION,
        payload:{
          projectPathValidation:{
            isValid:true
          }
        }
      }
    };
    mockVsCode = { postMessage };
    inferProjectName("t2",mockVsCode).then((newName:string)=>{
      expect(newName === "").toBeTruthy();
      resolve();
    });
  });

});