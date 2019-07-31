import { IGenerationPayloadType } from "./generationPayloadType";
import { ISyncPayloadType } from "./syncPayloadType";

type CommandPayload = IGenerationPayloadType | ISyncPayloadType;
export interface ICommandPayload {
  payload: CommandPayload;
  liveMessageHandler: (message: string, progress?: number) => any;
}
