import * as vscode from "vscode";
import { Controller } from "./controller";

var controller: Controller;
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.wizardLaunch",
      async () => {
        if (controller) {
          controller.showReactPanel();
          vscode.window.showInformationMessage("Wizard is already running.");
          return;
        }
        controller = new Controller(context, Date.now());
      }
    )
  );
}

export function deactivate() {
  controller.dispose();
}
