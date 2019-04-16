import { ExtensionCommand, CONSTANTS } from "./constants";
import { TelemetryAI, IActionContext } from "./telemetry/telemetryAI";

export abstract class WizardServant {
  // private static queuedCommand : (message: any) => Promise<IPayloadResponse>;
  abstract clientCommandMap: Map<ExtensionCommand, (message: any) => Promise<IPayloadResponse>>;
  private _commandBidding = (message: any) => {return new Promise(()=> {payload: ""})};

  public static callCommandWithClass(messagePayload: any, classModule: WizardServant, Telemetry: TelemetryAI){
    classModule._commandBidding = classModule.clientCommandMap.get(messagePayload.command)!;
    if(classModule._commandBidding){
      if(messagePayload.track){
        return Telemetry.callWithTelemetryAndCatchHandleErrors(messagePayload.command, async function (this: IActionContext){
          return classModule._commandBidding(messagePayload);
        });
      }
      else{
        return classModule._commandBidding(messagePayload);
      }
    }    
    else {
      // vscode.window.showErrorMessage(CONSTANTS.ERRORS.INVALID_COMMAND);
      return Telemetry.callWithTelemetryAndCatchHandleErrors(messagePayload.command, async function (this: IActionContext){
      throw Error(CONSTANTS.ERRORS.INVALID_COMMAND + ":" + messagePayload.command);
      });
    }
  }
}

export interface IPayloadResponse{
  payload: any;
}