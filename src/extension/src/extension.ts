import * as vscode from "vscode";
import { ChildProcess } from "child_process";
import { Controller } from "./controller";

let apiProcess: ChildProcess;

export function activate(context: vscode.ExtensionContext) {
  // Launch the client wizard assuming it has been built
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.wizardLaunch",
      async () => {
        apiProcess = await Controller.launchWizard(context, Date.now());
      }
    )
  );
}

export function deactivate() {
  // This will ensure all pending events get flushed
  apiProcess.kill();
}
