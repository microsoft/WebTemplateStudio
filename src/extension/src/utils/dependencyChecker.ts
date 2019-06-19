import { WizardServant, IPayloadResponse } from "../wizardServant";
import { ExtensionCommand } from "../constants";
const os = require('os');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const NODE = 'node';
const PYTHON = 'python';
// const PYTHON3 = 'python3';
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

  private async runPython3VersionCommand() {
    let installed: boolean;
    try {
      console.log("PYTHON3 COMMAND 1");
      const { stdout } = await exec('python3 --version');
      console.log("PYTHON3 COMMAND 2");
      console.log("python3 command out: " + stdout);
      if (PYTHON3_REGEX.test(stdout)) {
        console.log("PYTHON3 COMMAND 3");
        installed = true;
      } else {
        console.log("PYTHON3 COMMAND 4");
        installed = false;
      }
    } catch (err) {
      console.log("PYTHON3 COMMAND 5");
      installed = false;
    }
    console.log("PYTHON3 COMMAND 6: " + installed);
    return installed;
  }

  private async runPythonVersionCommand() {
    let installed: boolean;
    try {
      const { stdout } = await exec('python --version');
      console.log("python command out: " + stdout);
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

  private async runPythonLauncherVersionCommand() {
    let installed: boolean;
    try {
      const { stdout } = await exec('py -3 --version'); // using Python Launcher command
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

  // private outputIsPython27(stdout: any, stderr: any) {
  //   return stdout.indexOf(PYTHON27) === 0 || stderr.indexOf(PYTHON27) === 0;
  // }

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

      if (await this.runPython3VersionCommand()) {
        console.log("HERE1");
        state = true;
      } else if (await this.runPythonVersionCommand()) {
        console.log("HERE2");
        state = true;
      } else if (userOnWin && await this.runPythonLauncherVersionCommand()) {
        console.log("HERE3");
        state = true;
      } else {
        console.log("HERE4");
          state = false;
      }
      // let userOS: string = os.platform();
      // let userOnWin: boolean = userOS.indexOf('win') === 0;
      // let pythonCommand = userOnWin ? PYTHON : PYTHON3; // for Unix OS, do python3 command
      // try {
      //   const { stdout, stderr } = await exec(pythonCommand + ' --version');
      //   if (stdout.length > 0 || stderr.trim() === PYTHON27) {
      //     if (userOnWin && this.outputIsPython27(stdout, stderr)) {
      //         state = await this.checkForPython3();
      //     } else {
      //       state = true;
      //     }
      //   } else {
      //     state = false;
      //   } 
      // } catch (err) {
      //   if (userOnWin) {
      //     state = await this.checkForPython3();
      //   } else {
      //     state = false;
      //   }
      // }
    }
    return {
      payload: {
        dependency: name,
        installed: state
      }
    };
  }
}
