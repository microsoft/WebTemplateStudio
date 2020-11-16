import latestVersion from "latest-version";

export default class npmPackageSource implements IPackageSource {
  public async getLatestVersion(packageName: string) {
    const version = await latestVersion(packageName);
    return version;
  }
}
