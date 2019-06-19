import { WizardServant, IPayloadResponse } from "../wizardServant";
import { ExtensionCommand } from "../constants";
const os = require('os');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const PYTHON27 = 'Python 2.7';
const NODE = 'node';
const PYTHON = 'python';
const PYTHON3 = 'python3';

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

  private async checkForPython3() {
    let state: boolean;
    try {
      const { stdout } = await exec('py -3 --version'); // using Python Launcher command
      if (stdout.length > 0) {
        state = true;
      } else {
        state = false;
      }
    } catch (err) {
      state = false;
    }
    return state;
  }

  private outputIsPython27(stdout: any, stderr: any) {
    return stdout.indexOf(PYTHON27) === 0 || stderr.indexOf(PYTHON27) === 0;
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
      let pythonCommand = userOnWin ? PYTHON : PYTHON3; // for Unix OS, do python3 command
      try {
        const { stdout, stderr } = await exec(pythonCommand + ' --version');
        if (stdout.length > 0 || stderr.trim() === PYTHON27) {
          if (userOnWin && this.outputIsPython27(stdout, stderr)) {
              state = await this.checkForPython3();
          } else {
            state = true;
          }
        } else {
          state = false;
        } 
      } catch (err) {
        if (userOnWin) {
          state = await this.checkForPython3();
        } else {
          state = false;
        }
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
