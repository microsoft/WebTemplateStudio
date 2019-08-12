import * as childProcess from "child_process";
import * as vscode from "vscode";
import { IVSCodeProgressType } from "./types/vscodeProgressType";
import * as os from "os";
// import * as util from "util";
// const spawn = util.promisify(childProcess.spawn);

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
    const cp = childProcess.spawnSync(command, ["install"], {
      cwd: folderPath
    });
    console.log("ending process");
    console.log(cp);
    console.log(cp.stdout.toString());
    console.log(cp.stderr.toString());
  }

  public static async buildProject(
    progress: vscode.Progress<IVSCodeProgressType>,
    folderPath: string
  ) {
    const command = os.platform() == "win32" ? "npm.cmd" : "npm";
    progress.report({ message: "Building Project" });
    childProcess.spawnSync(command, ["run-script", "build"], {
      cwd: folderPath
    });
  }
}
