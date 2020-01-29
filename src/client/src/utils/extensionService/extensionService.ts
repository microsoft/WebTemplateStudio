import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import {
  EXTENSION_COMMANDS, EXTENSION_MODULES, WIZARD_CONTENT_INTERNAL_NAMES
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

const getFrameworks = (vscode: IVSCodeObject):Promise<any> => {
  return postMessageAsync(EXTENSION_COMMANDS.GET_FRAMEWORKS, {
    module: EXTENSION_MODULES.CORETS,
    command: EXTENSION_COMMANDS.GET_FRAMEWORKS,
    payload: {
      isPreview: false,
      projectType: WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP
    }
  }, vscode);
}

export {
  projectPathValidation,
  getValidationsConfig,
  getFrameworks
}
