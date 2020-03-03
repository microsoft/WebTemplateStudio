import { WizardServant, IPayloadResponse } from "./wizardServant";
import { ExtensionCommand } from "./constants";
import { CoreTemplateStudio } from "./coreTemplateStudio";

export class CoreTSModule extends WizardServant {
  clientCommandMap: Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  >;

  constructor() {
    super();
    this.clientCommandMap = this.defineCommandMap();
  }

  private defineCommandMap(): Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  > {
    return new Map([
      [ExtensionCommand.GetFrameworks, this.getFrameworks],
      [ExtensionCommand.GetPages, this.getPages],
      [ExtensionCommand.GetTemplateInfo, this.getTemplateConfig]
    ]);
  }

  async getFrameworks(message: any): Promise<IPayloadResponse> {
    const result = await CoreTemplateStudio.GetExistingInstance().getFrameworks(
      message.payload.projectType
    );
    return {
      payload: {
        scope:message.payload.scope,
        frameworks: result,
        isPreview: message.payload.isPreview,
        projectType: message.payload.projectType
      }
    };
  }

  async getTemplateConfig(message: any) {
    let payload = CoreTemplateStudio.GetExistingInstance().getTemplateConfig();
    payload.scope = message.payload.scope;
    return { payload };
  }

  async getPages(message: any): Promise<IPayloadResponse> {
    const result = await CoreTemplateStudio.GetExistingInstance().getPages(
      message.payload.projectType,
      message.payload.frontendFramework,
      message.payload.backendFramework
    );
    return {
      payload: {
        scope:message.payload.scope,
        pages: result
      }
    };
  }
}
