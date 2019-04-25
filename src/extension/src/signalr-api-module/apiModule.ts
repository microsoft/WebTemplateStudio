import * as vscode from "vscode";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import { ChildProcess, execFile } from "child_process";
import { CONSTANTS } from "../constants";
import { ICommandPayload } from "./commandPayload";
import { IGenerationPayloadType } from "../types/generationPayloadType";
import { CoreTemplateStudioApiCommand } from "./coreTemplateStudioApiCommand";
import { GenerateCommand } from "./generateCommand";
import { SyncCommand } from "./syncCommand";
import * as portfinder from "portfinder";

export class ApiModule {
  private static _process: ChildProcess | undefined;
  private static _lastUsedPort: number | undefined;

  public static async StartApi(
    context: vscode.ExtensionContext
  ): Promise<void> {
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

    if (os.platform() !== CONSTANTS.API.WINDOWS_PLATFORM_VERSION) {
      fs.chmodSync(apiPath, 0o755);
    }

    const port = await portfinder.getPortPromise({
      port: CONSTANTS.START_PORT
    });

    let spawnedProcess = execFile(
      `${apiPath}`,
      [`--urls=http://localhost:${port}`],
      { cwd: apiWorkingDirectory }
    );
    if (ApiModule._process) {
      ApiModule.StopApi();
      ApiModule._process = spawnedProcess;
    }

    ApiModule._lastUsedPort = port;
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

  public static GetLastUsedPort(): number {
    if (ApiModule._lastUsedPort) {
      return ApiModule._lastUsedPort;
    }

    throw new Error(
      "getLastUsedPort() was called before a port was allocated to the engine"
    );
  }

  public static StopApi() {
    if (ApiModule._process) {
      if (process.platform === CONSTANTS.API.WINDOWS_PLATFORM_VERSION) {
        let pid = ApiModule._process.pid;
        let spawn = require("child_process").spawn;
        spawn("taskkill", ["/pid", pid, "/f", "/t"]);
      } else {
        ApiModule._process.kill("SIGKILL");
      }
    }

    ApiModule._lastUsedPort = undefined;
    ApiModule._process = undefined;
  }
}
