import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "../wizardServant";
const fs = require("fs");
import { ExtensionCommand } from "../constants";

export class Logger extends WizardServant {
  clientCommandMap: Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  > = new Map([[ExtensionCommand.Log, Logger.receiveLogfromWizard]]);
  private static outputChannel: vscode.OutputChannel;
  private static outputContent: string = "";
  private static loggingFile = Logger.getLoggingFile();
  public static getLoggingFile() {
    fs.readdir("./logs", (error: any, items: any) => {
      for (var i = 0; i < items.length; i++) {
        // TODO: Check oldest log file if they are 5 and delete the 5th one
        // Otherwise, create a new file
      }
    });
    return fs.open("./logs/LOG_FILE", "a");
  }
  public static initializeOutputChannel(extensionName: string): void {
    if (Logger.outputChannel === undefined) {
      Logger.outputChannel = vscode.window.createOutputChannel(extensionName);
    }
  }
  public static appendLog(message: string): void {
    if (Logger.outputChannel === undefined) {
      Logger.initializeOutputChannel("Web Template Studio");
    }
    Logger.outputChannel.appendLine(message);
    Logger.outputContent.concat(message, "\n");
  }
  public static display(): void {
    if (Logger.outputChannel === undefined) {
      Logger.initializeOutputChannel("Web Template Studio");
    }
    Logger.outputChannel.show(true);
    Logger.loggingFile.appendLine(Logger.outputContent);
    Logger.outputContent = "";
  }
  private static async receiveLogfromWizard(
    message: any
  ): Promise<IPayloadResponse> {
    Logger.appendLog(message.input);
    return {
      payload: null
    };
  }
}
