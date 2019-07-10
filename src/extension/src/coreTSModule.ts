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
      [ExtensionCommand.GetPages, this.getPages]
    ]);
  }

  async getFrameworks(message: any): Promise<IPayloadResponse> {
    let result = await CoreTemplateStudio.GetExistingInstance().getFrameworks(
      message.payload.projectType
    );
    return {
      payload: {
        frameworks: result,
        isPreview: message.payload.isPreview,
        projectType: message.payload.projectType
      }
    };
  }

  async getPages(message: any): Promise<IPayloadResponse> {
    console.log(message.payload.projectType);
    console.log(message.payload.frontendFramework);
    console.log(message.payload.backendFramework);
    const result = await CoreTemplateStudio.GetExistingInstance().getPages(
      message.payload.projectType,
      message.payload.frontendFramework,
      message.payload.backendFramework
    );
    console.log("in extension");
    console.log(result);
    return {
      payload: {
        pages: result
      }
    };
  }
}
