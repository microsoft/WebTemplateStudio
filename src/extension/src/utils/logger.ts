import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import fs = require("fs");
import { ExtensionCommand } from "../constants";
import path = require("path");

const OUTPUT_CHANNEL_DEFAULT = "Web Template Studio";
const LOG_FILENAME_PREFIX = "LOG_WTS_LOCAL";
const GET_LOG_PATH = (filename: string) => {
  return path.join("./log", filename);
};

export class Logger extends WizardServant {
  clientCommandMap: Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  > = new Map([[ExtensionCommand.Log, Logger.receiveLogfromWizard]]);
  private static outputChannel: vscode.OutputChannel;
  private static outputContent: string = "";
  private static loggingFile = Logger.getLoggingFile();
  public static getLoggingFile() {
    let items = fs.readdirSync("./logs");
    let oldestFileDate: number = 0;
    let oldestFile: string = "";
    let logFilesCount: number = 0;
    // Get oldest file
    for (let i = 0; i < items.length; i++) {
      if (items[i].length > LOG_FILENAME_PREFIX.length) {
        if (items[i].startsWith(LOG_FILENAME_PREFIX)) {
          logFilesCount += 1;
          let currentFileDate = fs.statSync(GET_LOG_PATH(items[i])).birthtimeMs;
          if (oldestFileDate === 0 || oldestFileDate > currentFileDate) {
            oldestFileDate = currentFileDate;
            oldestFile = items[i];
          }
        }
      }
    }
    if (logFilesCount >= 5) {
      // Delete oldest file
      fs.unlinkSync(oldestFile);
    }
    return GET_LOG_PATH(LOG_FILENAME_PREFIX.concat("_", Date.now().toString()));
  }
  public static initializeOutputChannel(extensionName: string): void {
    if (Logger.outputChannel === undefined) {
      Logger.outputChannel = vscode.window.createOutputChannel(extensionName);
    }
  }
  public static appendLog(message: string): void {
    if (Logger.outputChannel === undefined) {
      Logger.initializeOutputChannel(OUTPUT_CHANNEL_DEFAULT);
    }
    Logger.outputChannel.appendLine(message);
    Logger.outputContent.concat(message, "\n");
  }
  public static display(): void {
    if (Logger.outputChannel === undefined) {
      Logger.initializeOutputChannel(OUTPUT_CHANNEL_DEFAULT);
    }
    Logger.outputChannel.show(true);
    fs.appendFileSync(Logger.loggingFile, Logger.outputContent);
    Logger.outputContent = "";
  }
  private static async receiveLogfromWizard(
    message: any
  ): Promise<IPayloadResponse> {
    Logger.appendLog(message.input);
    Logger.display();
    return {
      payload: null
    };
  }
}
