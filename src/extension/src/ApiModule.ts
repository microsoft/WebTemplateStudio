import * as vscode from "vscode";
import * as path from "path";
import { spawn, ChildProcess } from "child_process";

export default class ApiModule {
  public static StartApi(context: vscode.ExtensionContext): ChildProcess {
    let apiPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src",
        "api",
        "CoreTemplateStudio.Api.dll"
      )
    ).fsPath;

    let apiWorkingDirectory = path.join(context.extensionPath, "src", "api");
    let process = spawn("dotnet", [apiPath], { cwd: apiWorkingDirectory });
    return process;
  }
}
