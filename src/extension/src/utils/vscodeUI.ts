import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import {
  ExtensionCommand,
  DialogMessages,
  DialogResponses
} from "../constants";

export class VSCodeUI extends WizardServant {
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
      [ExtensionCommand.ResetPages, this.promptUsersToResetPages],
      [ExtensionCommand.CheckDependency, this.checkDependency]
    ]);
  }

  async checkDependency(dependency: any): Promise<IPayloadResponse> {
    const child_process = require('child_process');  

    var ls = child_process.spawn(dependency, ['--version']);
    ls.stdout.on('data', (data: any) => {
      if (dependency === 'python') {
        let outdated = data.indexOf('3.7.3')? false : true;
        console.log('outdated? ' + outdated);  
        // return payload 
      } else {
        // return payload 
      }
    });

    ls.on('error', (err: any) => {
      // return not installed payload
    });

    // stub
    return {
      payload: {
        name: dependency,
        installed: true
    }};
  }


  async promptUsersToResetPages(message: any): Promise<IPayloadResponse> {
    if (message.payload.pagesLength > 0) {
      return await vscode.window
        .showInformationMessage(
          DialogMessages.resetPagesPrompt,
          ...[DialogResponses.yes, DialogResponses.no]
        )
        .then((selection: vscode.MessageItem | undefined) => {
          let userConfirmation = {
            resetPages: false,
            internalName: message.payload.internalName
          };
          if (selection === DialogResponses.yes) {
            userConfirmation = {
              resetPages: true,
              internalName: message.payload.internalName
            };
          }
          return { payload: userConfirmation };
        });
    } else {
      return {
        payload: {
          resetPages: true,
          internalName: message.payload.internalName
        }
      };
    }
  }
}
