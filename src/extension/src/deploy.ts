import * as vscode from "vscode";

import { VSCODE_TASKS } from "./constants/constants";
import { IVSCodeProgressType } from "./types/vscodeProgressType";
import { Logger } from "./utils/logger";
import { getExtensionName } from "./utils/packageInfo";
import { executeTask, existTask, getTask } from "./utils/vscodeTaskService";

export class Deploy {
  private progressObject!: vscode.Progress<IVSCodeProgressType>;

  public static getInstance(context: vscode.ExtensionContext): Deploy {
    return new Deploy(context);
  }

  constructor(private context: vscode.ExtensionContext) {
    Logger.load(this.context.extensionPath);
    Logger.initializeOutputChannel(getExtensionName(this.context));
  }

  async deployProject(): Promise<void> {
    const isOpenProject = await this.isOpenWebTSProject();
    if (!isOpenProject) {
      vscode.window.showErrorMessage("There is no Web Template Studio project open");
      return;
    }

    await this.prepareForDeployment();
  }

  private async isOpenWebTSProject(): Promise<boolean> {
    const folderPath = Deploy.getCurrentWorkingDirectory();
    if (folderPath === undefined) return false;

    const existInstallDepencenciesTask = await existTask(VSCODE_TASKS.INSTALL_DEPENDENCIES);
    const existPublishTask = await existTask(VSCODE_TASKS.PUBLISH);
    return existInstallDepencenciesTask && existPublishTask;
  }

  private async prepareForDeployment(): Promise<void> {
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Preparing for Deployment",
      },
      async (progress: vscode.Progress<IVSCodeProgressType>) => {
        this.progressObject = progress;
        Logger.appendLog("EXTENSION", "info", "Preparing for Deployment");
        await this.installDependencies();
        await this.PublishApp();
        Logger.appendLog("EXTENSION", "info", "Build Completed");
        vscode.commands.executeCommand("appService.Deploy");
      }
    );
  }

  private async installDependencies() {
    const installDependenciesTask = await getTask(VSCODE_TASKS.INSTALL_DEPENDENCIES);
    if (installDependenciesTask) {
      this.ReportProgress("Installing Dependencies");
      await executeTask(installDependenciesTask);
    }
  }

  private async PublishApp() {
    const publishTask = await getTask(VSCODE_TASKS.PUBLISH);
    if (publishTask) {
      this.ReportProgress("Building Project");
      await executeTask(publishTask);
    }
  }

  private static getCurrentWorkingDirectory(): string | undefined {
    const folder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0] : undefined;
    return folder ? folder.uri.fsPath : undefined;
  }

  private ReportProgress(message: string): void {
    Logger.appendLog("EXTENSION", "info", message);
    this.progressObject.report({ message });
  }
}
