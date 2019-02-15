import * as vscode from "vscode";
import { ReactPanel } from "./ReactPanelBuilder";

export function activate(context: vscode.ExtensionContext) {
  //Launch the client wizard assuming it has been built

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "webTemplateStudioExtension.wizardLaunch",
      () => {
        ReactPanel.createOrShow(context.extensionPath);
      }
    )
  );
}