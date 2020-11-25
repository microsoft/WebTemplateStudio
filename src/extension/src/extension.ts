import * as vscode from "vscode";
import { Controller } from "./controller";
import { Deploy } from "./deploy";
import { PLATFORM } from "./constants/constants";

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand("webTemplateStudioExtension.wizardLaunch.local", async () => {
      //TODO: Modify this to support React Native
      Controller.getInstance(context, PLATFORM.WEB);
    }),
    vscode.commands.registerCommand("webTemplateStudioExtension.deployApp.local", async () => {
      await Deploy.getInstance(context).deployProject();
    })
  );
}

export function deactivate(): void {
  Controller.dispose();
}
