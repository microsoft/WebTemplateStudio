import * as vscode from "vscode";
import { Controller } from "./controller";
import ApiModule from "./signalr-api-module/apiModule";

export function activate(context: vscode.ExtensionContext) {
  // Launch the client wizard assuming it has been built
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.wizardLaunch",
      async () => {
        await Controller.launchWizard(context, Date.now());
      }
    )
  );
}

export function deactivate() {
  ApiModule.StopApi();
}
