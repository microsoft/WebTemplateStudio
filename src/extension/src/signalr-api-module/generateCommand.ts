import { CoreTemplateStudioApiCommand } from "./coreTemplateStudioApiCommand";
import { CONSTANTS } from "../CONSTANTS";
import { IGenerationPayloadType } from "../types/generationPayloadType";
import { IEngineGenerationPayloadType } from "../types/engineGenerationPayloadType";

export class GenerateCommand extends CoreTemplateStudioApiCommand {
  async performCommandAction(connection: signalR.HubConnection): Promise<any> {
    let body = this.makeEngineGenerationPayload(<IGenerationPayloadType>(
      this.commandPayload.payload
    ));

    connection.on(
      CONSTANTS.API.GEN_LIVE_MESSAGE_TRIGGER_NAME,
      this.commandPayload.liveMessageHandler
    );

    const result = await connection
      .invoke(CONSTANTS.API.SIGNALR_API_GENERATE_METHOD_NAME, body)
      .catch((error: Error) => Promise.reject(error));

    connection.stop();
    return Promise.resolve(result!.value);
  }

  private makeEngineGenerationPayload(
    payload: IGenerationPayloadType
  ): IEngineGenerationPayloadType {
    let {
      projectName,
      path,
      projectType,
      frontendFramework,
      backendFramework,
      pages,
      services
    } = payload;

    return {
      projectName: projectName,
      genPath: path,
      projectType: projectType,
      frontendFramework: frontendFramework,
      backendFramework: backendFramework,
      language: "Any",
      platform: "Web",
      homeName: "Test",
      pages: pages.map((page: any) => ({
        name: page.name,
        templateid: page.identity
      })),
      features: services.map((service: any) => ({
        name: service.name,
        templateid: service.identity
      }))
    };
  }
}
