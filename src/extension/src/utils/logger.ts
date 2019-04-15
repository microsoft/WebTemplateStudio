import * as vscode from "vscode";

export namespace Logger {
  export let outputChannel = vscode.window.createOutputChannel("WTS");
  export let outputContent = "";
    export let loggingFile: fopen("path");
  export function appendLog(message: string) {
    outputChannel.appendLine(message);
    // TO DO: APPEND TO OUTPUT FILE
    outputContent.concat(message);
  }
  export function display() {
    outputChannel.show(true);
  }
}
