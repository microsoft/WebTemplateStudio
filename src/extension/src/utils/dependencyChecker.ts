import { WizardServant, IPayloadResponse } from "../wizardServant";
import { ExtensionCommand } from "../constants";
const os = require('os');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const NODE = 'node';
const PYTHON = 'python';
const PYTHON3 = 'python3';
const PYTHON_LAUNCHER = 'py -3';
const PYTHON3_REGEX = RegExp('^Python 3\\.[0-9]\\.[0-9]');

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
      const { stdout } = await exec(command + ' --version');
      if (PYTHON3_REGEX.test(stdout)) {
        installed = true;
      } else {
        installed = false;
      }
    } catch (err) {
      installed = false;
    }
    return installed;
  }

  async checkDependency(message: any): Promise<IPayloadResponse> {
    let name: string = message.payload.dependency;
    let state: boolean = false;

    if (name === NODE) {
      try { 
        const { stdout } = await exec(NODE + ' --version');
        if (stdout.length > 0) { 
          state = true;
        } else {
          state = false;
        }
      } catch (err) {
        state = false;
      }
    }

    else if (name === PYTHON) {
      let userOS: string = os.platform();
      let userOnWin: boolean = userOS.indexOf('win') === 0;

      if (await this.runPythonVersionCommand(PYTHON3)) {
        state = true;
      } else if (await this.runPythonVersionCommand(PYTHON)) {
        state = true;
      } else if (userOnWin && await this.runPythonVersionCommand(PYTHON_LAUNCHER)) {
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
