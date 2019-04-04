import * as vscode from "vscode";
import * as path from "path";
import { ChildProcess, execFile } from "child_process";
import { CONSTANTS } from "./constants";
import * as signalR from "@aspnet/signalr";
import { ICommandPayload } from "./signalr-api-module/commandPayload";
import { IGenerationPayloadType } from "./types/generationPayloadType";
import { CoreTemplateStudioApiCommand } from "./signalr-api-module/coreTemplateStudioApiCommand";

export default class ApiModule {
  private static _process: ChildProcess;

  public static StartApi(context: vscode.ExtensionContext): ChildProcess {
    let platform = process.platform;

    let executableName = CONSTANTS.API.BASE_APPLICATION_NAME;

    if (platform === CONSTANTS.API.WINDOWS_PLATFORM_VERSION) {
      executableName += ".exe";
    }

    let apiPath = vscode.Uri.file(
      path.join(context.extensionPath, "src", "api", platform, executableName)
    ).fsPath;

    let apiWorkingDirectory = path.join(
      context.extensionPath,
      "src",
      "api",
      platform
    );

    let spawnedProcess = execFile(`${apiPath}`, { cwd: apiWorkingDirectory });
    ApiModule._process = spawnedProcess;
    return spawnedProcess;
  }

  public static StopApi() {
    if (process.platform === CONSTANTS.API.WINDOWS_PLATFORM_VERSION) {
      let pid = ApiModule._process.pid;
      var spawn = require("child_process").spawn;
      spawn("taskkill", ["/pid", pid, "/f", "/t"]);
    } else {
      ApiModule._process.kill("SIGKILL");
    }
  }
}
