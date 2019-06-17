import { WizardServant, IPayloadResponse } from "../wizardServant";
import { ExtensionCommand } from "../constants";
const os = require('os');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

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

  async checkDependency(message: any): Promise<IPayloadResponse> {
    var userOS = os.platform();
    // console.log("This is the user OS: " + userOS);

    var name = message.payload.dependency === 'python' && userOS.indexOf('win') === -1 ? 'python3' // if python and not windows and 
                                                                                       : message.payload.dependency; 
    var state;

    try {
      const { stdout, stderr } = await exec(name + ' --version');
      if (stdout.length > 0) {
        if (userOS.indexOf('win') !== -1 && stdout.indexOf('Python 2.7') === 0) { // on windows and python --version returns 2.7
          try {
            const { stdout } = await exec('py -3 --version'); // using Python Launcher
            if (stdout.length > 0) {
              state = true;
            } 
          } catch (err) {
            state = false;
          }
        } else {
          state = true;
        }
      } else if (stderr.length > 0) {
        state = false;
      } 
    } catch (err) {
      state = false;
    }
    return {
      payload: {
        dependency: name,
        installationState: state
      }
    };
  }
}
