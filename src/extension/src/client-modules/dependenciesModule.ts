import { WizardServant, IPayloadResponse } from "../wizardServant";
import { EXTENSION_COMMANDS } from "../constants/commands";
import latestVersion from "latest-version";
import RequirementsService from "../utils/requirements/requirementsService";
import { Logger } from "../utils/logger";
const axios = require("axios");

export class DependenciesModule extends WizardServant {
  private requirementsService = new RequirementsService();
  clientCommandMap: Map<EXTENSION_COMMANDS, (message: any) => Promise<IPayloadResponse>> = new Map([
    [EXTENSION_COMMANDS.GET_DEPENDENCY_INFO, this.requirementIsInstalled],
    [EXTENSION_COMMANDS.GET_LATEST_VERSION, this.getLatestVersion],
  ]);

  async requirementIsInstalled(message: any): Promise<IPayloadResponse> {
    const dependency = message.payload.dependency as string;
    const installed = await this.requirementsService.isInstalled(dependency);
    return {
      payload: {
        scope: message.payload.scope,
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
      latestVersionStr = await this.getLatestVersionFromGithub(checkVersionPackageName);
    }

    return {
      payload: {
        scope: message.payload.scope,
        latestVersion: latestVersionStr,
      },
    };
  }

  private async getLatestVersionFromGithub(packageName: string): Promise<string> {
    let latestVersion = "";
    try {
      const urlGitHub = "https://api.github.com/repos/" + packageName + "/releases";
      const response = await axios.get(urlGitHub);
      latestVersion = response.data
        .map((release: any) => release.tag_name)
        .find((version: string) => !version.toLowerCase().includes("preview"));

        //ASP.NET version start with 'v', remove this
        latestVersion = latestVersion.replace('v', '');
    } catch (error) {
      Logger.appendError("EXTENSION", `Error getting latest version of ${packageName} package from GitHub:`, error);
    }
    return latestVersion;
  }
}
