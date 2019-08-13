import * as vscode from "vscode";
import { Controller } from "./controller";
import { Deploy } from "./deploy";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.wizardLaunch",
      async () => {
        Controller.getInstance(context, Date.now());
      }
    ),
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.deployApp",
      async () => {
        Deploy.getInstance();
      }
    )
  );
}

export function deactivate() {
  Controller.dispose();
}
