import { WizardServant, IPayloadResponse } from "../wizardServant";
import { ExtensionCommand, CONSTANTS } from "../constants";
const os = require("os");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const PYTHON3_REGEX = RegExp("^Python 3\\.[5-9]\\.[0-9]"); // minimum Python version required is 3.5.x
const NODE_REGEX = RegExp("v10\\.(1[5-9]|[2-9][0-9])\\.[0-9]"); // minimum Node version required is 10.15.x

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
      const { stdout } = await exec(command + " --version");
      installed = PYTHON3_REGEX.test(stdout);
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
        state = NODE_REGEX.test(stdout);
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
