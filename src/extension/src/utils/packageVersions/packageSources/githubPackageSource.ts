import { Logger } from "../../logger";

const axios = require("axios");

export default class githubPackageSource implements IPackageSource {
  public async getLatestVersion(packageName: string) {
    let latestVersion = "";
    try {
      const urlGitHub = "https://api.github.com/repos/" + packageName + "/releases";
      const response = await axios.get(urlGitHub);
      latestVersion = response.data
        .map((release: any) => release.tag_name)
        .find(
          (version: string) => !version.toLowerCase().includes("preview") && !version.toLowerCase().includes("-rc")
        );

      //ASP.NET version start with 'v', remove this
      latestVersion = latestVersion.replace("v", "");
    } catch (error) {
      Logger.appendError("EXTENSION", `Error getting latest version of ${packageName} package from GitHub:`, error);
    }
    return latestVersion;
  }
}
