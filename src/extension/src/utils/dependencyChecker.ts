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

  private async checkPython3() {
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

  async checkDependency(message: any): Promise<IPayloadResponse> {
    var userOS = os.platform();
    var name = message.payload.dependency === 'python' && userOS.indexOf('win') !== 0 ? 'python3' // if python and not on windows 
                                                                                      : message.payload.dependency; 
    var state;
    try {
      const { stdout, stderr } = await exec(name + ' --version');
      if (stdout.length > 0 || stderr.trim() === PYTHON27) {
        if (userOS.indexOf('win') === 0 && 
           (stdout.indexOf(PYTHON27) === 0 || stderr.indexOf(PYTHON27) === 0)) { // on windows and python --version returns 2.7
            state = await this.checkPython3();
        } else {
          state = true;
        }
      } else if (stderr.length > 0) {
        
        state = false;
      } 
    } catch (err) {
      if (name === 'python') {
        state = await this.checkPython3();
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
