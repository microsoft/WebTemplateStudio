import { WizardServant, IPayloadResponse } from "./wizardServant";
import { EXTENSION_COMMANDS } from "./constants/commands";
import { CoreTemplateStudio } from "./coreTemplateStudio";

export class CoreTSModule extends WizardServant {
  clientCommandMap: Map<EXTENSION_COMMANDS, (message: any) => Promise<IPayloadResponse>>;

  constructor() {
    super();
    this.clientCommandMap = this.defineCommandMap();
  }

  private defineCommandMap(): Map<EXTENSION_COMMANDS, (message: any) => Promise<IPayloadResponse>> {
    return new Map([
      [EXTENSION_COMMANDS.GET_FRAMEWORKS, this.getFrameworks],
      [EXTENSION_COMMANDS.GET_ALL_LICENSES, this.getAllLicenses],
      [EXTENSION_COMMANDS.GET_PAGES, this.getPages],
      [EXTENSION_COMMANDS.GET_FEATURES, this.getFeatures],
      [EXTENSION_COMMANDS.GET_TEMPLATE_INFO, this.getTemplateConfig],
      [EXTENSION_COMMANDS.GET_PROJECT_TYPES, this.getProjectTypes],
    ]);
  }

  async getFrameworks(message: any): Promise<IPayloadResponse> {
    const frameworks = await CoreTemplateStudio.GetExistingInstance().getFrameworks(message.payload.projectType);
    return {
      payload: {
        scope: message.payload.scope,
        frameworks
      },
    };
  }

  async getProjectTypes(message: any): Promise<IPayloadResponse> {
    const projectTypes = await CoreTemplateStudio.GetExistingInstance().getProjectTypes();
    return {
      payload: {
        scope: message.payload.scope,
        projectTypes
      },
    };
  }

  async getAllLicenses(message: any): Promise<IPayloadResponse> {
    const licenses = await CoreTemplateStudio.GetExistingInstance().getAllLicenses(message);
    return {
      payload: {
        scope: message.payload.scope,
        licenses
      },
    };
  }

  async getTemplateConfig(message: any): Promise<IPayloadResponse> {
    const payload = CoreTemplateStudio.GetExistingInstance().getTemplateConfig();
    payload.scope = message.payload.scope;
    return { payload };
  }

  async getPages(message: any): Promise<IPayloadResponse> {
    const { projectType, frontendFramework, backendFramework } = message.payload;
    const pages = await CoreTemplateStudio.GetExistingInstance().getPages(projectType, frontendFramework, backendFramework);
    return {
      payload: {
        scope: message.payload.scope,
        pages,
      },
    };
  }

  async getFeatures(message: any): Promise<IPayloadResponse> {
    const { projectType, frontendFramework, backendFramework } = message.payload;
    const features = await CoreTemplateStudio.GetExistingInstance().getFeatures(projectType, frontendFramework, backendFramework);
    return {
      payload: {
        scope: message.payload.scope,
        features,
      },
    };
  }
}
