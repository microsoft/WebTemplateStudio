import { ExtensionCommand, CONSTANTS } from "./constants";
import { TelemetryAI, IActionContext } from "./telemetry/telemetryAI";

export abstract class Extensible {
  // private static queuedCommand : (message: any) => Promise<IPayloadResponse>;
  abstract clientCommandMap: Map<ExtensionCommand, (message: any) => Promise<IPayloadResponse>>;
  private commandName = (message: any) => {return new Promise(()=> {payload: ""})};

  public static callCommandWithClass(messagePayload: any, classModule: Extensible, Telemetry: TelemetryAI){
    classModule.commandName = classModule.clientCommandMap.get(messagePayload.command)!;
    if(classModule.commandName){
      if(messagePayload.track){
        return Telemetry.callWithTelemetryAndCatchHandleErrors(messagePayload.command, async function (this: IActionContext){
          return classModule.commandName(messagePayload);
        });
      }
      else{
        return classModule.commandName(messagePayload);
      }
    }    
    else {
      // vscode.window.showErrorMessage(CONSTANTS.ERRORS.INVALID_COMMAND);
      throw Error(CONSTANTS.ERRORS.INVALID_COMMAND);
    }
  }
}

export interface IPayloadResponse{
  payload: any;
}