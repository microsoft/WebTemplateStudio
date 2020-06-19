import { WizardServant, IPayloadResponse } from "../wizardServant";
import { ExtensionCommand } from "../constants";
import latestVersion from "latest-version";
import DependencyChecker from "../utils/dependencyChecker/dependencyChecker";
const axios = require("axios");

export class DependenciesModule extends WizardServant {
  clientCommandMap: Map<ExtensionCommand, (message: any) => Promise<IPayloadResponse>> = new Map([
    [ExtensionCommand.CheckDependency, this.checkDependency],
    [ExtensionCommand.GetLatestVersion, this.getLatestVersion],
  ]);

  dependencyChecker = new DependencyChecker();

  async checkDependency(message: any): Promise<IPayloadResponse> {
    const dependency = message.payload.dependency as string;
    const installed = await this.dependencyChecker.hasDependency(dependency);
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
