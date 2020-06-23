import util = require("util");
import semver = require("semver");

export default class NetCoreValidator implements IRequirementValidator {
  private exec = util.promisify(require("child_process").exec);
  private NETCORE_REGEX = RegExp("([0-9.]+)");
  private NETCORE_REQUIREMENT = ">=3.1.x";

  public async isInstalled() {
    try {
      const { stdout } = await this.exec("dotnet --version");
      const version = stdout.match(this.NETCORE_REGEX)[1];
      const result = semver.satisfies(version, this.NETCORE_REQUIREMENT);
      return result;
    } catch (err) {
      return false;
    }
  }
}
