import { spawn, ChildProcess } from "child_process";
import * as vscode from "vscode";
import { IVSCodeProgressType } from "./types/vscodeProgressType";
import * as os from "os";
import { Logger } from "./utils/logger";

export class Deploy {
  private folderPath: string | undefined;
  private progressObject!: vscode.Progress<IVSCodeProgressType>;

  public static getInstance(): Deploy {
    return new Deploy();
  }

  constructor() {
    const folderPath = Deploy.getCurrentWorkingDirectory();
    if (!this.checkValidFolderPath(folderPath)) {
      return;
    }
    this.folderPath = folderPath;
    this.prepareForDeployment();
  }

  private checkValidFolderPath(folderPath: string | undefined): boolean {
    if (!folderPath) {
      vscode.window.showErrorMessage("No Project Opened Up");
      return false;
    }
    return true;
  }

  private async prepareForDeployment(): Promise<void> {
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Preparing for Deployment"
      },
      async (progress: vscode.Progress<IVSCodeProgressType>) => {
        this.progressObject = progress;
        Logger.appendLog("EXTENSION", "info", "Preparing for Deployment");
        await this.installDependencies();
        await this.buildProject();
        Logger.appendLog("EXTENSION", "info", "Build Completed");
        vscode.commands.executeCommand("appService.Deploy");
      }
    );
  }

  private static getCurrentWorkingDirectory(): string | undefined {
    const folder = vscode.workspace.workspaceFolders
      ? vscode.workspace.workspaceFolders[0]
      : undefined;
    return folder ? folder.uri.fsPath : undefined;
  }

  private async installDependencies(): Promise<void> {
    const command = os.platform() == "win32" ? "npm.cmd" : "npm";
    this.ReportProgress("Installing Dependencies");
    return Deploy.promiseFromChildProcess(
      spawn(command, ["install"], {
        cwd: this.folderPath
      })
    );
  }

  private async buildProject(): Promise<void> {
    const command = os.platform() == "win32" ? "npm.cmd" : "npm";
    this.ReportProgress("Building Project");
    return Deploy.promiseFromChildProcess(
      spawn(command, ["run-script", "build"], {
        cwd: this.folderPath
      })
    );
  }

  private static promiseFromChildProcess(child: ChildProcess): Promise<void> {
    return new Promise(function(resolve, reject) {
      child.addListener("error", reject);
      child.addListener("exit", resolve);
      child.stderr.on("data", data =>
        Logger.appendLog("EXTENSION", "error", data.toString())
      );
    });
  }

  private ReportProgress(message: string): void {
    Logger.appendLog("EXTENSION", "info", message);
    this.progressObject.report({ message });
  }
}
