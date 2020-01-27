import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import {
  EXTENSION_COMMANDS
} from "../constants";

const postMessageAsync = (command:string, paramsMessage:any, vscode: IVSCodeObject)=>{
  let promise = new Promise<any>((resolve) => {
    const callbackVsCode = (event:any) =>{
      if (event.data.command == command){
        resolve(event);
        window.removeEventListener("message",callbackVsCode);
      }
    }

    window.addEventListener("message", callbackVsCode);
    vscode.postMessage(paramsMessage);
  });
  return promise;
};

const projectPathValidation = (paramsMessage:any, vscode: IVSCodeObject):Promise<any> => {
  let promise:Promise<any> = postMessageAsync(EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION, paramsMessage, vscode);
  return promise;
}

const getValidationsConfig = (paramsMessage:any, vscode: IVSCodeObject):Promise<any> => {
  return postMessageAsync(EXTENSION_COMMANDS.GET_VALIDATIONS, paramsMessage, vscode);
}

export {
  projectPathValidation,
  getValidationsConfig
}
