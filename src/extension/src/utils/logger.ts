import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import fs = require("fs");
import { ExtensionCommand } from "../constants";
import path = require("path");

type LogType = "INFO" | "WARNING" | "ERROR";
type LogSource = "WIZARD" | "EXTENSION";
type ILoggingPayload = {
  type: LogType;
  data: string;
};

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
  public static getLoggingFile(): string {
    let items = fs.readdirSync("./logs");
    let oldestFileDate: Date = new Date(Date.now());
    let oldestFile: string = "";
    let logFilesCount: number = 0;
    // Get oldest file
    for (let i = 0; i < items.length; i++) {
      if (items[i].length > LOG_FILENAME_PREFIX.length) {
        if (items[i].startsWith(LOG_FILENAME_PREFIX)) {
          logFilesCount += 1;
          let currentFileDate = fs.statSync(GET_LOG_PATH(items[i])).ctime;
          if (oldestFileDate > currentFileDate) {
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
    let currentDate = new Date()
      .toLocaleDateString(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      })
      .replace("/", "");
    return GET_LOG_PATH(LOG_FILENAME_PREFIX.concat("_", currentDate));
  }
  public static initializeOutputChannel(extensionName: string): void {
    if (Logger.outputChannel === undefined) {
      Logger.outputChannel = vscode.window.createOutputChannel(extensionName);
      this.appendLog("EXTENSION", "INFO", ">>>>>>>>> Launched");
    }
  }
  public static appendLog(
    source: LogSource,
    type: LogType,
    data: string
  ): void {
    if (Logger.outputChannel === undefined) {
      Logger.initializeOutputChannel(OUTPUT_CHANNEL_DEFAULT);
    }
    Logger.outputChannel.appendLine(source.concat("-", type, ":", data));
    Logger.outputContent.concat(source, "-", type, ":", data, "\n");
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
    message: ILoggingPayload
  ): Promise<IPayloadResponse> {
    Logger.appendLog("WIZARD", message.type, message.data);
    Logger.display();
    return {
      payload: null
    };
  }
}
