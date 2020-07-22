import util = require("util");
import semver = require("semver");
import { CONSTANTS } from "../../../constants/constants";

export default class NodeValidator implements IRequirementValidator {
  private exec = util.promisify(require("child_process").exec);
  private NODE_REGEX = RegExp("v(.+)");
  private NODE_REQUIREMENT = ">=12.0.x";

  public async isInstalled() {
    try {
      const { stdout } = await this.exec(CONSTANTS.DEPENDENCY_CHECKER.NODE + " --version");
      const version = stdout.match(this.NODE_REGEX)[1];
      const result = semver.satisfies(version, this.NODE_REQUIREMENT);
      return result;
    } catch (err) {
      return false;
    }
  }
}
