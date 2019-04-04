import { IGenerationPayloadType } from "../types/generationPayloadType";

export interface ICommandPayload {
  payload: IGenerationPayloadType;
  port: number;
  liveMessageHandler: (message: string) => any;
}
