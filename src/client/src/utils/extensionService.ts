import { IVSCodeObject } from "../reducers/vscodeApiReducer";

export const postMessageAsync = (command:string, paramsMessage:any, vscode: IVSCodeObject)=>{
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
