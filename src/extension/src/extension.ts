import * as vscode from "vscode";
import { Controller } from "./controller";
import ApiModule from "./signalr-api-module/apiModule";


var controller: Controller;
export function activate(context: vscode.ExtensionContext) {
  // Launch the client wizard assuming it has been built
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
  ApiModule.StopApi();
}
