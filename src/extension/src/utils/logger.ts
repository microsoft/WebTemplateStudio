import * as vscode from "vscode";
import path = require("path");
import log4js = require("log4js");
export type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";
export type LogSource = "WIZARD" | "EXTENSION" | "CORE";
const OUTPUT_CHANNEL_DEFAULT = "Web Template Studio";

export class Logger {
  public static outputChannel: vscode.OutputChannel;
  private static logger: log4js.Logger;
  public static filename: string;

  public static load(context: string): void {
    this.filename = path.join(context, "logs", "wts.log");
    log4js.configure({
      appenders: {
        webtemplatestudio: {
          type: "file",
          filename: this.filename,
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
    this.logger = log4js.getLogger();
  }

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

  public static appendError(source: LogSource, message: string, error: Error): void {
    const level: LogLevel = "error";
    const showLogInfo = "Show log for more info.";
    const messageToOutput = `${message} ${error.message} ${showLogInfo}`;
    const stackMessage = error.stack ? error.stack : error.message;
    const messageToLog = `${message} ${stackMessage}`;

    if (Logger.outputChannel === undefined) {
      Logger.initializeOutputChannel(OUTPUT_CHANNEL_DEFAULT);
    }
    Logger.logger[level]("[", source, "] ", messageToLog);
    Logger.outputChannel.appendLine("[".concat(new Date().toLocaleString(), "]", "[", source, "] ", messageToOutput));
  }

  public static display(): void {
    if (Logger.outputChannel === undefined) {
      Logger.initializeOutputChannel(OUTPUT_CHANNEL_DEFAULT);
    }
    Logger.outputChannel.show(true);
  }
}
