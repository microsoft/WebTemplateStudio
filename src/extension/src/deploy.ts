import { spawn } from "child_process";
import * as vscode from "vscode";
import { IVSCodeProgressType } from "./types/vscodeProgressType";
import * as os from "os";

export class Deploy {
  private folderPath: string | undefined;
  private progressObject!: vscode.Progress<IVSCodeProgressType>;

  public static getInstance() {
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

  private async prepareForDeployment() {
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Preparing for Deployment"
      },
      async (progress: vscode.Progress<IVSCodeProgressType>) => {
        this.progressObject = progress;
        await this.installDependencies();
        await this.buildProject();
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

  private async installDependencies() {
    const command = os.platform() == "win32" ? "npm.cmd" : "npm";
    this.progressObject.report({ message: "Installing Dependencies" });
    return Deploy.promiseFromChildProcess(
      spawn(command, ["install"], {
        cwd: this.folderPath
      })
    );
  }

  private async buildProject() {
    const command = os.platform() == "win32" ? "npm.cmd" : "npm";
    this.progressObject.report({ message: "Building Project" });
    return Deploy.promiseFromChildProcess(
      spawn(command, ["run-script", "build"], {
        cwd: this.folderPath
      })
    );
  }

  private static promiseFromChildProcess(child: any) {
    return new Promise(function(resolve, reject) {
      child.addListener("error", reject);
      child.addListener("exit", resolve);
    });
  }
}
