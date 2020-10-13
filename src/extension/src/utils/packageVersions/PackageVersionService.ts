import { CONSTANTS } from "../../constants/constants";
import githubPackageSource from "./packageSources/githubPackageSource";
import npmPackageSource from "./packageSources/npmPackageSource";

export default class PackageVersionService {
  private packageSources: Map<string, IPackageSource>;

  constructor() {
    this.packageSources = new Map<string, IPackageSource>([
      [CONSTANTS.PACKAGE_SOURCES.NPM, new npmPackageSource()],
      [CONSTANTS.PACKAGE_SOURCES.GITHUB, new githubPackageSource()],
    ]);
  }

  public async getLatestVersion(packageName: string, packageSource: string) {
    const requirementValidator = this.packageSources.get(packageSource);
    const result = requirementValidator ? await requirementValidator.getLatestVersion(packageName) : "";
    return result;
  }
}
