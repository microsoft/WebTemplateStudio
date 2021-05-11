import latestVersion from "latest-version";

import { IPackageSource } from "../IPackageSource";

export default class npmPackageSource implements IPackageSource {
  public async getLatestVersion(packageName: string) {
    const version = await latestVersion(packageName);
    return version;
  }
}
