import * as vscode from "vscode";
import { Controller } from "./controller";
import { Deploy } from "./deploy";
import { PLATFORM } from "./constants/constants";

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand("webTemplateStudioExtension.web.createApp.local", async () => {
      Controller.getInstance(context, PLATFORM.WEB);
    }),
    vscode.commands.registerCommand("webTemplateStudioExtension.reactNative.createApp.local", async () => {
      Controller.getInstance(context, PLATFORM.REACTNATIVE);
    }),
    vscode.commands.registerCommand("webTemplateStudioExtension.web.deployApp.local", async () => {
      await Deploy.getInstance(context).deployProject();
    })
  );
}

export function deactivate(): void {
  Controller.dispose();
}
