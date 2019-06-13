import { WizardServant, IPayloadResponse } from "../wizardServant";
import { ExtensionCommand } from "../constants";
const child_process = require('child_process');

const NOT_INSTALLED = -1;
const OUTDATED = 0;
const INSTALLED = 1;

const SUPPORTED_PYTHON_VERSION = '3.7.3';
const SUPPORTED_NODE_VERSION_REGEX = /^v10\.[0-9]{1,2}\.[0-9]$/;

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
    return new Map([
      [ExtensionCommand.CheckDependency, this.checkDependency]
    ]);
  }

  async checkDependency(message: any): Promise<IPayloadResponse> {
    // keeping this here for now, not sure which is the better practice, spawn vs exec ??
    // const child_process = require('child_process');  
    // var name = message.payload.dependency;
    // var ls = child_process.spawn(name, ['--version']);
    // ls.stdout.on('data', (data: any) => {
    //   if (name === 'python' && data.indexOf('3.7.3') === -1) { // python 3.7.3 is not installed
    //     return {
    //       payload: {
    //         dependency: name,
    //         info: 0
    //       }
    //     };
    //   } else if (name === 'node' && data.indexOf('10.') === -1) { // node 10.x.x is not installed
    //       return {
    //         payload: {
    //           dependency: name,
    //           installed: 0
    //         }
    //       };
    //   }});

    // ls.on('error', (err: any) => {
    //   return {
    //     payload: {
    //       dependency: name,
    //       notInstalled: -1
    //     }
    //   };
    // });

    // return {
    //   payload: {
    //     dependency: name,
    //     installed: 1
    //   }
    // };
    
    var name = message.payload.dependency;
    var state;
    child_process.exec(name + " --version", (err: any, stdout: any, stderr: any) => {
      if ((err !== null || stderr.length > 0) && stdout.length === 0) {
        state = NOT_INSTALLED;
      }
      else {
        if ((name === 'python' && stdout.indexOf(SUPPORTED_PYTHON_VERSION) !== -1) ||
            (name === 'node'   && !SUPPORTED_NODE_VERSION_REGEX.test(stdout))) {
            state = OUTDATED;
        }
        else {
          state = INSTALLED;
        }
      }
    });
    return {
      payload: {
        dependency: name,
        state: state
      }
    };
  }
}
