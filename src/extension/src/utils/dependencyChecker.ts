import { WizardServant, IPayloadResponse } from "../wizardServant";
import { ExtensionCommand, CONSTANTS } from "../constants";
const os = require("os");
const util = require("util");
const semver = require('semver');
const exec = util.promisify(require("child_process").exec);

const NODE_REGEX = RegExp("v(.+)");
const NODE_REQUIREMENT = ">=10.15.x";
const PYTHON_REGEX = RegExp("Python ([0-9.]+)");
const PYTHON_REQUIREMENT = ">=3.5.x";

export class DependencyChecker extends WizardServant {
  clientCommandMap: Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  >;

  constructor() {
    super();
    this.clientCommandMap = this.defineCommandMap();
  }

  private defineCommandMap(): Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  > {
    return new Map([[ExtensionCommand.CheckDependency, this.checkDependency]]);
  }

  private async runPythonVersionCommand(command: string) {
    let installed: boolean;
    try {
      const { stdout, stderr} = await exec(command + " --version");
      // stderr is also processed for older versions of anaconda!
      const matches = stdout.match(PYTHON_REGEX) || stderr.match(PYTHON_REGEX);
      const version: string = matches[1];
      installed = semver.satisfies(version, PYTHON_REQUIREMENT);
    } catch (err) {
      installed = false;
    }
    return installed;
  }

  async checkDependency(message: any): Promise<IPayloadResponse> {
    let name: string = message.payload.dependency;
    let state: boolean = false;
    if (name === CONSTANTS.DEPENDENCY_CHECKER.NODE) {
      try {
        const { stdout } = await exec(
          CONSTANTS.DEPENDENCY_CHECKER.NODE + " --version"
        );
        const version = stdout.match(NODE_REGEX)[1];
        state = semver.satisfies(version, NODE_REQUIREMENT);
      } catch (err) {
        state = false;
      }
    } else if (name === CONSTANTS.DEPENDENCY_CHECKER.PYTHON) {
      let userOS: string = os.platform();
      let userOnWin: boolean = userOS.indexOf("win") === 0;

      if (
        await this.runPythonVersionCommand(CONSTANTS.DEPENDENCY_CHECKER.PYTHON3)
      ) {
        state = true;
      } else if (
        await this.runPythonVersionCommand(CONSTANTS.DEPENDENCY_CHECKER.PYTHON)
      ) {
        state = true;
      } else if (
        userOnWin &&
        (await this.runPythonVersionCommand(
          CONSTANTS.DEPENDENCY_CHECKER.PYTHON_LAUNCHER
        ))
      ) {
        state = true;
      } else {
        state = false;
      }
    }
    return {
      payload: {
        dependency: name,
        installed: state
      }
    };
  }
}
