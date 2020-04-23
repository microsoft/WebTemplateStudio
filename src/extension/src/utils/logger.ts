import * as vscode from "vscode";
import path = require("path");
import log4js = require("log4js");
export type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";
export type LogSource = "WIZARD" | "EXTENSION" | "CORE";
export const LOG_FILE = path.join(__dirname, "../../logs", "wts.log");
const OUTPUT_CHANNEL_DEFAULT = "Web Template Studio";

log4js.configure({
  appenders: {
    webtemplatestudio: {
      type: "file",
      filename: LOG_FILE,
      pattern: ".yyyy-MM-dd",
      daysToKeep: 5,
    },
  },
  categories: {
    default: {
      appenders: ["webtemplatestudio"],
      level: "all",
    },
  },
});

export class Logger {
  public static outputChannel: vscode.OutputChannel;
  private static logger: log4js.Logger = log4js.getLogger();

  public static initializeOutputChannel(extensionName: string): void {
    if (Logger.outputChannel === undefined) {
      Logger.outputChannel = vscode.window.createOutputChannel(extensionName);
    }
    Logger.appendLog("EXTENSION", "info", "Launched");
  }

  public static appendLog(source: LogSource, level: LogLevel, data: string): void {
    if (Logger.outputChannel === undefined) {
      Logger.initializeOutputChannel(OUTPUT_CHANNEL_DEFAULT);
    }
    Logger.logger[level]("[", source, "] ", data);
    Logger.outputChannel.appendLine("[".concat(new Date().toLocaleString(), "]", "[", source, "] ", data));
  }

  public static display(): void {
    if (Logger.outputChannel === undefined) {
      Logger.initializeOutputChannel(OUTPUT_CHANNEL_DEFAULT);
    }
    Logger.outputChannel.show(true);
  }
}
