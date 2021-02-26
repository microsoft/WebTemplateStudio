import util = require("util");
import semver = require("semver");
import { CONSTANTS } from "../../../constants/constants";
import { IRequirementValidator } from "../IRequirementValidator";

export default class NodeValidator implements IRequirementValidator {
  private exec = util.promisify(require("child_process").exec);
  private NODE_REGEX = RegExp("v(.+)");

  public async isInstalled(minVersion: string) {
    try {
      const { stdout } = await this.exec(CONSTANTS.DEPENDENCY_CHECKER.NODE + " --version");
      const version = stdout.match(this.NODE_REGEX)[1];
      const range = `>=${minVersion}`;
      const result = semver.satisfies(version, range);
      return result;
    } catch (err) {
      return false;
    }
  }
}
