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
    return await vscode.window
      .showInformationMessage(
        DialogMessages.resetPagesPrompt,
        ...[DialogResponses.yes, DialogResponses.no]
      )
      .then((selection: vscode.MessageItem | undefined) => {
        let userConfirmation = { resetpage: false };
        if (selection === DialogResponses.yes) {
          userConfirmation = { resetpage: true };
        }
        return { payload: userConfirmation };
      });
  }
}
