import { WizardServant, IPayloadResponse } from "../wizardServant";
import { ExtensionCommand } from "../constants";
// const child_process = require("child_process");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const NOT_INSTALLED = 0;
const INSTALLED = 1;

// const SUPPORTED_PYTHON_VERSION = "3.7.3";
// const SUPPORTED_NODE_VERSION_REGEX = /^v10\.[0-9]{1,2}\.[0-9]$/;

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

  // private runVersionCommand(name: any) {
  //     return Promise
    
  // }

  async checkDependency(message: any): Promise<IPayloadResponse> {
    var name = message.payload.dependency;
    var state;


    try {
      const { stdout, stderr } = await exec(name + ' --version');
      if (stdout.length > 0) {
        state = INSTALLED;
      } else if (stderr.length > 0) {
        state = NOT_INSTALLED;
      }
    } catch (err) {
      state = NOT_INSTALLED;
    }
    console.log("This is state: " + state);
    return {
      payload: {
        dependency: name,
        installationState: state
      }
    };
  }
}
