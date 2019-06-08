import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import { ExtensionCommand } from "../constants";
import path = require("path");
import log4js = require("log4js");
type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";
type LogSource = "WIZARD" | "EXTENSION" | "CORE";
type ILoggingPayload = {
  level: LogLevel;
  data: string;
};

const ABSOLUTE_LOG_PATH = path.join(__dirname, "../../logs");
const OUTPUT_CHANNEL_DEFAULT = "Web Template Studio";

log4js.configure({
  appenders: {
    webtemplatestudio: {
      type: "file",
      filename: path.join(ABSOLUTE_LOG_PATH, "wts.log"),
      pattern: ".yyyy-MM-dd",
      daysToKeep: 5
    }
  },
  categories: {
    default: {
      appenders: ["webtemplatestudio"],
      level: "all"
    }
  }
});

export class Logger extends WizardServant {
  clientCommandMap: Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  > = new Map([[ExtensionCommand.Log, Logger.receiveLogfromWizard]]);
  public static outputChannel: vscode.OutputChannel;
  private static logger: log4js.Logger = log4js.getLogger();
  public static initializeOutputChannel(extensionName: string): void {
    if (Logger.outputChannel === undefined) {
      Logger.outputChannel = vscode.window.createOutputChannel(extensionName);
    }
    Logger.appendLog("EXTENSION", "info", "Launched");
  }
  public static appendLog(
    source: LogSource,
    level: LogLevel,
    data: string
  ): void {
    if (Logger.outputChannel === undefined) {
      Logger.initializeOutputChannel(OUTPUT_CHANNEL_DEFAULT);
    }
    Logger.logger[level]("[", source, "] ", data);
    Logger.outputChannel.appendLine(
      "[".concat(new Date().toLocaleString(), "]", "[", source, "] ", data)
    );
  }
  public static display(level: LogLevel): void {
    if (Logger.outputChannel === undefined) {
      Logger.initializeOutputChannel(OUTPUT_CHANNEL_DEFAULT);
    }
    Logger.outputChannel.show(true);
  }
  private static async receiveLogfromWizard(
    message: ILoggingPayload
  ): Promise<IPayloadResponse> {
    Logger.appendLog("WIZARD", message.level, message.data);
    Logger.display(message.level);
    return {
      payload: null
    };
  }
}
