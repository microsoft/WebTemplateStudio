import { Logger } from "../../logger";
import semver = require("semver");
import axios from "axios";

import { IPackageSource } from "../IPackageSource";

export default class githubPackageSource implements IPackageSource {
  public async getLatestVersion(packageName: string) {
    let latestVersion = "0.0.0";
    try {
      const urlGitHub = "https://api.github.com/repos/" + packageName + "/releases";
      const response = await axios.get(urlGitHub);
      response.data
        .map((release: any) => release.tag_name)
        .forEach((item: string) => {
          const version = semver.valid(item);
          if (version && !semver.prerelease(version) && semver.gt(version, latestVersion)) {
            latestVersion = version;
          }
        });
    } catch (error) {
      Logger.appendError("EXTENSION", `Error getting latest version of ${packageName} package from GitHub:`, error);
    }
    return latestVersion;
  }
}
