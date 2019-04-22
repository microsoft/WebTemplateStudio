import * as vscode from "vscode";
import { Controller } from "./controller";

var controller: Controller;
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.wizardLaunch",
      async () => {
        controller = new Controller(context, Date.now());
      }
    )
  );
}

export function deactivate() {
  controller.dispose();
}
