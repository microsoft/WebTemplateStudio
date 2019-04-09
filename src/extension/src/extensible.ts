import { ExtensionCommand, CONSTANTS } from "./constants";
import { TelemetryAI, IActionContext } from "./telemetry/telemetryAI";

export abstract class Extensible {
  private static queuedCommand : (message: any) => Promise<IPayloadResponse>;
  abstract clientCommandMap: Map<ExtensionCommand, (message: any) => Promise<IPayloadResponse>>;
  
  public callCommandSpecifiedByPayload(messagePayload: any, Telemetry: TelemetryAI){
    Extensible.queuedCommand = this.clientCommandMap.get(messagePayload.command)!;

    return Telemetry.callWithTelemetryAndCatchHandleErrors(messagePayload.command, async function (this: IActionContext){
      if (Extensible.queuedCommand) {
        return Extensible.queuedCommand(messagePayload);
      }
      else {
        // vscode.window.showErrorMessage(CONSTANTS.ERRORS.INVALID_COMMAND);
        throw Error(CONSTANTS.ERRORS.INVALID_COMMAND);
      }
    });
  }
}

export interface IPayloadResponse{
  payload: any;
}