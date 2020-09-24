import { IGenerationData } from "./generationPayloadType";
import { ISyncPayloadType } from "./syncPayloadType";

export interface ICommandPayload {
  payload: IGenerationData | ISyncPayloadType;
  liveMessageHandler: (message: string, progress?: number) => any;
}
