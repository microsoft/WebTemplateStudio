import { spawn } from "child_process";
import * as vscode from "vscode";
import { IVSCodeProgressType } from "./types/vscodeProgressType";
import * as os from "os";

export class Deploy {
  public static getCurrentWorkingDirectory(): string | undefined {
    const folder = vscode.workspace.workspaceFolders
      ? vscode.workspace.workspaceFolders[0]
      : undefined;
    return folder ? folder.uri.fsPath : undefined;
  }

  public static async installDependencies(
    progress: vscode.Progress<IVSCodeProgressType>,
    folderPath: string
  ) {
    const command = os.platform() == "win32" ? "npm.cmd" : "npm";
    progress.report({ message: "Installing Dependencies" });
    return Deploy.promiseFromChildProcess(
      spawn(command, ["install"], {
        cwd: folderPath
      })
    );
  }

  public static async buildProject(
    progress: vscode.Progress<IVSCodeProgressType>,
    folderPath: string
  ) {
    const command = os.platform() == "win32" ? "npm.cmd" : "npm";
    progress.report({ message: "Building Project" });
    return Deploy.promiseFromChildProcess(
      spawn(command, ["run-script", "build"], {
        cwd: folderPath
      })
    );
  }

  public static promiseFromChildProcess(child: any) {
    return new Promise(function(resolve, reject) {
      child.addListener("error", reject);
      child.addListener("exit", resolve);
    });
  }
}
