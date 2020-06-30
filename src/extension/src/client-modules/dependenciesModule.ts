import { WizardServant, IPayloadResponse } from "../wizardServant";
import { ExtensionCommand } from "../constants";
import latestVersion from "latest-version";
import RequirementsService from "../utils/requirements/requirementsService";
const axios = require("axios");

export class DependenciesModule extends WizardServant {
  private requirementsService = new RequirementsService();
  
  clientCommandMap: Map<ExtensionCommand, (message: any) => Promise<IPayloadResponse>> = new Map([
    [ExtensionCommand.CheckDependency, this.requirementIsInstalled],
    [ExtensionCommand.GetLatestVersion, this.getLatestVersion],
  ]);

  async requirementIsInstalled(message: any): Promise<IPayloadResponse> {
    const dependency = message.payload.dependency as string;
    const installed = await this.requirementsService.isInstalled(dependency);
    return {
      payload: {
        dependency,
        installed,
      },
    };
  }

  public async getLatestVersion(message: any): Promise<any> {
    const checkVersionPackageName = message.payload.checkVersionPackageName;
    const checkVersionPackageSource = message.payload.checkVersionPackageSource;
    let latestVersionStr = "";
    if (checkVersionPackageSource === "npm") {
      latestVersionStr = await latestVersion(checkVersionPackageName);
    }
    if (checkVersionPackageSource === "github") {
      const urlGitHub = "https://api.github.com/repos/" + checkVersionPackageName + "/releases/latest";
      const response = await axios.get(urlGitHub);
      latestVersionStr = response.data.tag_name;
    }

    return Promise.resolve({
      payload: {
        scope: message.payload.scope,
        latestVersion: latestVersionStr,
      },
    });
  }
}
