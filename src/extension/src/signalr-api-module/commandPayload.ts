import { IGenerationPayloadType } from "../types/generationPayloadType";
import { ISyncPayloadType } from "../types/syncPayloadType";

type CommandPayload = IGenerationPayloadType | ISyncPayloadType;
export interface ICommandPayload {
  payload: CommandPayload;
  port: number;
  liveMessageHandler: (message: string, progress?: number) => any;
}
