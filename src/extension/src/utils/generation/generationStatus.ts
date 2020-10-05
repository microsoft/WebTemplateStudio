import { EXTENSION_COMMANDS } from "../../constants/commands";
import { Controller } from "../../controller";

export enum GenerationItemStatus {
  Stopped = "Stopped",
  Generating = "Generating",
  Failed = "Failed",
  Success = "Success",
}

export const TEMPLATES_GENERATION_NAME = "templates";

export const sendGenerationStatus = (name: string, status: string, message?: string, data?: any) => {
  Controller.reactPanelContext.postMessageWebview({
    command: EXTENSION_COMMANDS.GEN_STATUS,
    payload: {
      name,
      status,
      message,
      data,
    },
  });
};

export const updateStatusMessage = (message: string) => {
  sendGenerationStatus(TEMPLATES_GENERATION_NAME, GenerationItemStatus.Generating, message);
};
