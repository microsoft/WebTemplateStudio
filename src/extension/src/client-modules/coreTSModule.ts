import { WizardServant, IPayloadResponse } from "../wizardServant";
import { EXTENSION_COMMANDS } from "../constants/commands";
import { CoreTemplateStudio } from "../coreTemplateStudio";

import fs = require("fs-extra");

export class CoreTSModule extends WizardServant {
  clientCommandMap: Map<EXTENSION_COMMANDS, (message: any) => Promise<IPayloadResponse>> = new Map([
    [EXTENSION_COMMANDS.GET_PROJECT_TYPES, this.getProjectTypes],
    [EXTENSION_COMMANDS.GET_FRAMEWORKS, this.getFrameworks],
    [EXTENSION_COMMANDS.GET_ALL_LICENSES, this.getAllLicenses],
    [EXTENSION_COMMANDS.GET_PAGES, this.getPages],
    [EXTENSION_COMMANDS.GET_FEATURES, this.getFeatures],
    [EXTENSION_COMMANDS.GET_TEMPLATE_INFO, this.getTemplateConfig],
  ]);

  async getProjectTypes(): Promise<IPayloadResponse> {
    const projectTypes = await CoreTemplateStudio.GetExistingInstance().getProjectTypes();
    return {
      payload: {
        projectTypes,
      },
    };
  }

  private getBase64 = (array: any): any => {
    array
      .filter((item: any) => item.icon !== null && item.icon !== "")
      .forEach((item: any) => {
        item.iconBase64 = fs.readFileSync(item.icon, "base64");
      });

    //if some doesn´t have icon get default image
  };

  async getFrameworks(message: any): Promise<IPayloadResponse> {
    const frameworks = await CoreTemplateStudio.GetExistingInstance().getFrameworks(message.payload.projectType);

    this.getBase64(frameworks);

    return {
      payload: {
        frameworks,
      },
    };
  }

  async getAllLicenses(message: any): Promise<IPayloadResponse> {
    const licenses = await CoreTemplateStudio.GetExistingInstance().getAllLicenses(message);
    return {
      payload: {
        licenses,
      },
    };
  }

  async getTemplateConfig(): Promise<IPayloadResponse> {
    const payload = CoreTemplateStudio.GetExistingInstance().getTemplateConfig();
    return { payload };
  }

  async getPages(message: any): Promise<IPayloadResponse> {
    const { projectType, frontendFramework, backendFramework } = message.payload;
    const pages = await CoreTemplateStudio.GetExistingInstance().getPages(
      projectType,
      frontendFramework,
      backendFramework
    );
    return {
      payload: {
        pages,
      },
    };
  }

  async getFeatures(message: any): Promise<IPayloadResponse> {
    const { projectType, frontendFramework, backendFramework } = message.payload;
    const features = await CoreTemplateStudio.GetExistingInstance().getFeatures(
      projectType,
      frontendFramework,
      backendFramework
    );
    this.getBase64(features);

    return {
      payload: {
        features,
      },
    };
  }
}
