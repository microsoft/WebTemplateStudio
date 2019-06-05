import { CoreTemplateStudioApiCommand } from "./coreTemplateStudioApiCommand";
import { CONSTANTS } from "../constants";
import { Logger } from "../utils/logger";

export class SyncCommand extends CoreTemplateStudioApiCommand {
  async performCommandAction(connection: signalR.HubConnection): Promise<any> {
    connection.on(
      CONSTANTS.API.SYNC_LIVE_MESSAGE_TRIGGER_NAME,
      this.commandPayload.liveMessageHandler
    );

    const result = await connection
      .invoke(
        CONSTANTS.API.SIGNALR_API_SYNC_METHOD_NAME,
        this.commandPayload.payload!.path
      )
      .catch((error: Error) => {
        Logger.appendLog("EXTENSION", "error", error.message);
        Promise.reject(error);
      });

    connection.stop();

    return Promise.resolve(result!.value);
  }
}
