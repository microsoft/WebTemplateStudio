import * as vscode from "vscode";
import { Controller } from "./controller";
import { Deploy } from "./deploy";
import { IVSCodeProgressType } from "./types/vscodeProgressType";

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
        const folderPath = Deploy.getCurrentWorkingDirectory();
        console.log(folderPath);
        if (!folderPath) {
          vscode.window.showErrorMessage("No Project Opened Up");
          return;
        }

        vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: "Preparing for Deployment"
          },
          async (progress: vscode.Progress<IVSCodeProgressType>) => {
            await Deploy.installDependencies(progress, folderPath);
            console.log("here");
            await Deploy.buildProject(progress, folderPath);
          }
        );
      }
    )
  );
}

export function deactivate() {
  Controller.dispose();
}
