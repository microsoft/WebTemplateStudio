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
      [ExtensionCommand.ResetPages, this.promptUsersToResetPages]
    ]);
  }

  async promptUsersToResetPages(message: any) {
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
