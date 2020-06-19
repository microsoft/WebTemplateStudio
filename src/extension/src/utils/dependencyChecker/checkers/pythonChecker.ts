import os = require("os");
import util = require("util");
import semver = require("semver");
import { CONSTANTS } from "../../../constants";

const exec = util.promisify(require("child_process").exec);
const PYTHON_REGEX = RegExp("Python ([0-9.]+)");
const PYTHON_REQUIREMENT = ">=3.5.x";

export default class PythonChecker implements IDependencyChecker {
  public async hasDependency() {
    const userOS: string = os.platform();
    const userOnWin: boolean = userOS.indexOf("win") === 0;

    if (await this.runPythonVersionCommand(CONSTANTS.DEPENDENCY_CHECKER.PYTHON3)) {
      return true;
    }
    if (await this.runPythonVersionCommand(CONSTANTS.DEPENDENCY_CHECKER.PYTHON)) {
      return true;
    }
    if (userOnWin && (await this.runPythonVersionCommand(CONSTANTS.DEPENDENCY_CHECKER.PYTHON_LAUNCHER))) {
      return true;
    }

    return false;
  }

  private async runPythonVersionCommand(command: string): Promise<boolean> {
    let installed: boolean;
    try {
      const { stdout, stderr } = await exec(command + " --version");
      // stderr is also processed for older versions of anaconda!
      const matches = stdout.match(PYTHON_REGEX) || stderr.match(PYTHON_REGEX);
      const version: string = matches[1];
      installed = semver.satisfies(version, PYTHON_REQUIREMENT);
    } catch (err) {
      installed = false;
    }
    return installed;
  }
}
