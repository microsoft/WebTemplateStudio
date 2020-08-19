import { WizardServant, IPayloadResponse } from "../wizardServant";
import { PROJECT_NAME_VALIDATION_LIMIT, DEFAULT_PROJECT_NAME } from "../constants/constants";
import * as vscode from "vscode";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import { EXTENSION_COMMANDS } from "../constants/commands";
import { CLI_SETTINGS } from "../constants/cli";

export class Defaults extends WizardServant {
  clientCommandMap: Map<EXTENSION_COMMANDS, (message: any) => Promise<IPayloadResponse>> = new Map([
    [EXTENSION_COMMANDS.GET_PROJECT_NAME, this.getProjectName],
    [EXTENSION_COMMANDS.GET_OUTPUT_PATH_FROM_CONFIG, this.getOutputPathFromConfig],
    [EXTENSION_COMMANDS.BROWSE_NEW_OUTPUT_PATH, this.browseNewOutputPath],
  ]);

  public async getProjectName(message: any): Promise<IPayloadResponse> {
    const outputPath = this.getDefaultProjectPath();
    const projectName = await this.inferProjectName(outputPath);
    return {
      payload: {
        scope: message.payload.scope,
        projectName,
      },
    };
  }

  public async getOutputPathFromConfig(message: any): Promise<IPayloadResponse> {
    const outputPath = this.getDefaultProjectPath();
    return {
      payload: {
        scope: message.payload.scope,
        outputPath,
      },
    };
  }

  public async browseNewOutputPath(message: any): Promise<IPayloadResponse> {
    const openDialogConfig = { canSelectFiles: false, canSelectFolders: true, canSelectMany: false };
    return vscode.window.showOpenDialog(openDialogConfig).then((response) => {
      const outputPath = this.getOutputPath(response);
      return {
        payload: {
          scope: message.payload.scope,
          outputPath,
        },
      };
    });
  }

  private getDefaultProjectPath(): string {
    const projectPath = vscode.workspace.getConfiguration().get<string>("wts.changeSaveToLocation");
    return projectPath ?? os.homedir();
  }

  private async inferProjectName(outputPath: string): Promise<string> {
    let projectName = DEFAULT_PROJECT_NAME;
    let count = 1;

    while (fs.existsSync(path.join(outputPath, projectName)) && count <= PROJECT_NAME_VALIDATION_LIMIT) {
      projectName = `${DEFAULT_PROJECT_NAME}${count}`;
      count++;
    }
    if (count > PROJECT_NAME_VALIDATION_LIMIT) {
      projectName = "";
    }
    return projectName;
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
