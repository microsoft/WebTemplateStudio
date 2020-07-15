import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import { PAYLOAD_MESSAGES_TEXT } from "../constants/constants";
import { ExtensionCommand } from "../constants/extension";
import { MESSAGES } from "../constants/messages";

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

  async promptUsersToResetPages(message: any): Promise<any> {
    if (
      message.payload.pagesLength > 0 &&
      message.text === PAYLOAD_MESSAGES_TEXT.RESET_PAGES_TEXT
    ) {
      return await vscode.window
        .showInformationMessage(
          MESSAGES.DialogMessages.resetPagesPrompt,
          ...[MESSAGES.DialogResponses.yes, MESSAGES.DialogResponses.no]
        )
        .then((selection: vscode.MessageItem | undefined) => {
          let userConfirmation = {
            resetPages: false,
            internalName: message.payload.internalName,
            scope:Number
          };
          if (selection === MESSAGES.DialogResponses.yes) {
            userConfirmation = {
              resetPages: true,
              internalName: message.payload.internalName,
              scope: message.payload.scope
            };
          }
          return { payload: userConfirmation };
        });
    } else {
      return {
        payload: {
          scope: message.payload.scope,
          resetPages: true,
          internalName: message.payload.internalName
        }
      };
    }
  }
}
