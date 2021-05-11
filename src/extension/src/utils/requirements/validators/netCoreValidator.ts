import util = require("util");
import semver = require("semver");
import { IRequirementValidator } from "../IRequirementValidator";

export default class NetCoreValidator implements IRequirementValidator {
  private exec = util.promisify(require("child_process").exec);
  private NETCORE_REGEX = RegExp("([0-9.]+)");

  public async isInstalled(minVersion: string) {
    try {
      const { stdout } = await this.exec("dotnet --version");
      const version = stdout.match(this.NETCORE_REGEX)[1];
      const range = `>=${minVersion}`;
      const result = semver.satisfies(version, range);
      return result;
    } catch (err) {
      return false;
    }
  }
}
