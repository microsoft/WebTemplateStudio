import { inferProjectName } from './projectName';
import {
  EXTENSION_COMMANDS
} from "../constants";

describe("validate infer name", () => {
  xit("is not same",(resolve)=>{
    let callbackExtension: Function;
    let mockCallbackProjectPathValidation = {};

    const postMessage = jest.fn(() => callbackExtension(mockCallbackProjectPathValidation));
    const mockVsCode = { postMessage };
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
    inferProjectName("t2",mockVsCode).then((newName: string)=>{
      expect(newName === "").toBeTruthy();
      resolve();
    });
  });

});