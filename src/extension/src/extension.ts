import * as vscode from "vscode";
import { Controller } from "./controller";
import { Deploy } from "./deploy";
import { PLATFORM } from "./constants/constants";

fdescribe
export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand("webTemplateStudioExtension.wizardLaunch.local", async () => {
      //TODO: Modify this to support React Native
      //TODO: PLATFORM.REACTNATIVE || PLATFORM.WEB
      Controller.getInstance(context, PLATFORM.REACTNATIVE);
    }),
    vscode.commands.registerCommand("webTemplateStudioExtension.deployApp.local", async () => {
      await Deploy.getInstance(context).deployProject();
    })
  );
}

export function deactivate(): void {
  Controller.dispose();
}
