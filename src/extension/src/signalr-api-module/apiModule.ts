import * as vscode from "vscode";
import * as path from "path";
import { ChildProcess, execFile } from "child_process";
import { CONSTANTS } from "../constants";
import { ICommandPayload } from "./commandPayload";
import { IGenerationPayloadType } from "../types/generationPayloadType";
import { CoreTemplateStudioApiCommand } from "./coreTemplateStudioApiCommand";
import { GenerateCommand } from "./generateCommand";
import { SyncCommand } from "./syncCommand";

export class ApiModule {
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

  public static async ExecuteApiCommand(
    commandPayload: ICommandPayload
  ): Promise<any> {
    let command: CoreTemplateStudioApiCommand;

    if ((<IGenerationPayloadType>commandPayload.payload).projectName) {
      command = new GenerateCommand(commandPayload);
    } else {
      command = new SyncCommand(commandPayload);
    }

    return await command.execute();
  }

  public static StopApi() {
    if (process.platform === CONSTANTS.API.WINDOWS_PLATFORM_VERSION) {
      let pid = ApiModule._process.pid;
      let spawn = require("child_process").spawn;
      spawn("taskkill", ["/pid", pid, "/f", "/t"]);
    } else {
      ApiModule._process.kill("SIGKILL");
    }
  }
}
