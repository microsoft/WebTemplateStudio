import os = require("os");
import util = require("util");
import semver = require("semver");
import { CONSTANTS } from "../../../constants/constants";

const exec = util.promisify(require("child_process").exec);
const PYTHON_REGEX = RegExp("Python ([0-9.]+)");

export default class PythonValidator implements IRequirementValidator {
  public async isInstalled(minVersion: string) {
    const userOS: string = os.platform();
    const userOnWin: boolean = userOS.indexOf("win") === 0;

    if (await this.runPythonVersionCommand(CONSTANTS.DEPENDENCY_CHECKER.PYTHON3, minVersion)) {
      return true;
    }
    if (await this.runPythonVersionCommand(CONSTANTS.DEPENDENCY_CHECKER.PYTHON, minVersion)) {
      return true;
    }
    if (userOnWin && (await this.runPythonVersionCommand(CONSTANTS.DEPENDENCY_CHECKER.PYTHON_LAUNCHER, minVersion))) {
      return true;
    }

    return false;
  }

  private async runPythonVersionCommand(command: string, minVersion: string): Promise<boolean> {
    let installed: boolean;
    try {
      const { stdout, stderr } = await exec(command + " --version");
      // stderr is also processed for older versions of anaconda!
      const matches = stdout.match(PYTHON_REGEX) || stderr.match(PYTHON_REGEX);
      const version: string = matches[1];
      const range = `>=${minVersion}`;
      installed = semver.satisfies(version, range);
    } catch (err) {
      installed = false;
    }
    return installed;
  }
}
