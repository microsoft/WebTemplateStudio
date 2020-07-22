import * as vscode from "vscode";
import { Controller } from "./controller";
import { Deploy } from "./deploy";
import { AppType } from "./constants";

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.wizardLaunch",
      async () => {
        Controller.getInstance(context, AppType.Web);
      }
    ),
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.deployApp",
      async () => {
        Deploy.getInstance(context);
      }
    )
  );
}

export function deactivate(): void {
  Controller.dispose();
}
