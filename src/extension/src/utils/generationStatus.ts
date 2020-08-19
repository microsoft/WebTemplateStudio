import { EXTENSION_COMMANDS } from "../constants/commands";
import { Controller } from "../controller";

export enum GenerationItemStatus {
  Stopped = "Stopped",
  Generating = "Generating",
  Failed = "Failed",
  Success = "Success",
}

export const GENERATION_NAMES = {
  TEMPLATES: "templates",
  APP_SERVICE: "appService",
  COSMOS_DB: "cosmosDB",
};

export const sendToClientGenerationStatus = (name: string, status: string, message?: string) => {
  Controller.reactPanelContext.postMessageWebview({
    command: EXTENSION_COMMANDS.GEN_STATUS,
    payload: {
      name,
      status,
      message,
    },
  });
};

export const updateStatusMessage = (message: string) => {
  sendToClientGenerationStatus(GENERATION_NAMES.TEMPLATES, GenerationItemStatus.Generating, message);
};

export const sendToClientGenerationPath = (outputPath: string) => {
  Controller.reactPanelContext.postMessageWebview({
    command: EXTENSION_COMMANDS.UPDATE_OUTPUT_PATH_AFTER_GENERATING,
    payload: { outputPath },
  });
};
