import { WizardServant, IPayloadResponse } from "../wizardServant";
import * as vscode from "vscode";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import { EXTENSION_COMMANDS } from "../constants/commands";
import { CLI_SETTINGS } from "../constants/cli";
import { Logger } from "../utils/logger";

export class Defaults extends WizardServant {
  clientCommandMap: Map<EXTENSION_COMMANDS, (message: any) => Promise<IPayloadResponse>> = new Map([
    [EXTENSION_COMMANDS.GET_OUTPUT_PATH_FROM_CONFIG, this.getOutputPathFromConfig],
    [EXTENSION_COMMANDS.BROWSE_NEW_OUTPUT_PATH, this.browseNewOutputPath],
  ]);

  public async getOutputPathFromConfig(): Promise<IPayloadResponse> {
    const outputPath = this.getDefaultProjectPath();
    return {
      payload: {
        outputPath,
      },
    };
  }

  public async browseNewOutputPath(): Promise<IPayloadResponse> {
    const openDialogConfig = { canSelectFiles: false, canSelectFolders: true, canSelectMany: false };
    return vscode.window.showOpenDialog(openDialogConfig).then((response) => {
      const outputPath = this.getOutputPath(response);
      return {
        payload: {
          outputPath,
        },
      };
    });
  }

  private getDefaultProjectPath(): string {
    let projectPath = vscode.workspace.getConfiguration().get<string>("wts.changeSaveToLocation");

    //if path is wrong return default path
    if (projectPath !== undefined && !fs.existsSync(path.join(projectPath, ""))) {
      Logger.appendLog("EXTENSION", "error", `The configured default path '${projectPath}' does not seem to be valid.`);
      projectPath = os.homedir();
    }

    return projectPath !== undefined && projectPath !== "" ? projectPath : os.homedir();
  }

  private getOutputPath(path?: vscode.Uri[]): string | undefined {
    if (path === undefined) {
      return undefined;
    }
    let outputPath = path[0].path;
    if (process.platform === CLI_SETTINGS.WINDOWS_PLATFORM_VERSION) {
      outputPath = outputPath.substring(1, path[0].path.length);
    }
    return outputPath;
  }
}
