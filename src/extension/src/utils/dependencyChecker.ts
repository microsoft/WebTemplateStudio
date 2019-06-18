import { WizardServant, IPayloadResponse } from "../wizardServant";
import { ExtensionCommand } from "../constants";
const os = require('os');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const PYTHON27 = 'Python 2.7';

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
    var state;
    try {
      const { stdout } = await exec('py -3 --version'); // using Python Launcher command
      if (stdout.length > 0) {
        state = true;
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
    var userOS = os.platform();
    var userOnWin = userOS.indexOf('win') === 0;
    var name = message.payload.dependency === 'python' && !userOnWin ? 'python3'
                                                                     : message.payload.dependency; 
    var state;
    try {
      const { stdout, stderr } = await exec(name + ' --version');
      if (stdout.length > 0 || stderr.trim() === PYTHON27) {
        if (userOnWin && this.outputIsPython27(stdout, stderr)) {
            state = await this.checkForPython3();
        } else {
          state = true;
        }
      } else if (stderr.length > 0) {
        state = false;
      } 
    } catch (err) {
      if (userOnWin) {
        state = await this.checkForPython3();
      } else {
        state = false;
      }
    }
    return {
      payload: {
        dependency: name,
        installationState: state
      }
    };
  }
}
