import { ExtensionCommand, CONSTANTS } from "./constants";
import { TelemetryAI, IActionContext } from "./telemetry/telemetryAI";

export abstract class WizardServant {
  abstract clientCommandMap: Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  >;
  private _commandBidding = (message: any) => {
    return new Promise(() => {
      payload: "";
    });
  };
  /**
   * @param messagePayload The payload given from the client; includes the wizard command and arguments to be called
   * @param classModule The context of the wizardservant; needs to be passed in so that execution of the command will be on the given context
   * @param Telemetry Provides the ability to wrap functions commands with Telemetry
   */
  public static executeWizardCommandOnServantClass(
    messagePayload: any,
    classModule: WizardServant,
    Telemetry: TelemetryAI
  ) {
    classModule._commandBidding = classModule.clientCommandMap.get(
      messagePayload.command
    )!;
    if (classModule._commandBidding) {
      if (messagePayload.track) {
        return Telemetry.callWithTelemetryAndCatchHandleErrors(
          messagePayload.command,
          async function(this: IActionContext) {
            return classModule._commandBidding(messagePayload);
          }
        );
      } else {
        try {
          return classModule._commandBidding(messagePayload);
        } catch (error) {
          // To ensure error gets logged and report an issue experience launches
          return Telemetry.callWithTelemetryAndCatchHandleErrors(
            messagePayload.command,
            async function(this: IActionContext) {
              throw error;
            }
          );
        }
      }
    } else {
      return Telemetry.callWithTelemetryAndCatchHandleErrors(
        messagePayload.command,
        async function(this: IActionContext) {
          throw Error(
            CONSTANTS.ERRORS.INVALID_COMMAND + ":" + messagePayload.command
          );
        }
      );
    }
  }
}

export interface IPayloadResponse {
  payload: any;
}
