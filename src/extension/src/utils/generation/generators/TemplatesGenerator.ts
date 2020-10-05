import { MESSAGES } from "../../../constants/messages";
import { CoreTemplateStudio } from "../../../coreTemplateStudio";
import { IGenerationData } from "../../../types/generationTypes";
import {
  GenerationItemStatus,
  sendGenerationStatus,
  TEMPLATES_GENERATION_NAME,
  updateStatusMessage,
} from "../generationStatus";
import { Logger } from "../../logger";

export default class TemplatesGenerator {
  public async generate(generationData: IGenerationData): Promise<string|undefined> {
    const { PROJECT_GENERATION_FINISHED, TEMPLATES_COULD_NOT_BE_GENERATED } = MESSAGES.GENERATION;
    const { Generating, Success, Failed } = GenerationItemStatus;
    try {
      sendGenerationStatus(TEMPLATES_GENERATION_NAME, Generating);
      const cli = CoreTemplateStudio.GetExistingInstance();
      const result = await cli.generate({ payload: generationData, liveMessageHandler: updateStatusMessage });
      const generationPath = result.generationPath;
      sendGenerationStatus(TEMPLATES_GENERATION_NAME, Success, PROJECT_GENERATION_FINISHED, {
        generationPath,
      });
      return generationPath;
    } catch (error) {
      Logger.appendError("EXTENSION", MESSAGES.ERRORS.GENERATING_PROJECT, error);
      sendGenerationStatus(TEMPLATES_GENERATION_NAME, Failed, TEMPLATES_COULD_NOT_BE_GENERATED);
      return;
    }
  }
}
