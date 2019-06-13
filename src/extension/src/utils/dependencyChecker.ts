import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import {
  ExtensionCommand,
  DialogMessages,
  DialogResponses
} from "../constants";

export class DependencyChecker extends WizardServant {
  clientCommandMap: Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  >;

  /**
   *
   */
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
    const child_process = require('child_process');  
    var name = message.payload.dependency;
    var ls = child_process.spawn(name, ['--version']);
    ls.stdout.on('data', (data: any) => {
      if (name === 'python' && data.indexOf('3.7.3') === -1) { // python 3.7.3 is not installed
        return {
          payload: {
            dependency: name,
            installed: "Python 3.7.3 is required. Click to install."
          }
        };
      }
      return {
        payload: {
          dependency: name,
          installed: name + " is installed!"
        }
      };
    });

    ls.on('error', (err: any) => {
      return {
        payload: {
          dependency: name,
          notInstalled: name + " "
        }

      }
    });
  }
}
