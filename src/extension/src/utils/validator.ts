import * as vscode from "vscode";
import { CONSTANTS, ExtensionCommand } from "../constants";
import fs = require("fs");
import path = require("path");
import { Extensible, IPayloadResponse } from "../extensible";

export class Validator extends Extensible {
  clientCommandMap: Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  > = new Map([
    [ExtensionCommand.GetOutputPath, Validator.sendOutputPathSelectionToClient],
    [ExtensionCommand.ProjectPathValidation, Validator.handleProjectPathValidation]
  ]);

  public static async sendOutputPathSelectionToClient(
    message: any
  ): Promise<IPayloadResponse> {
    return vscode.window
      .showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false
      })
      .then((res: any) => {
        let path = undefined;

        if (res !== undefined) {
          if (process.platform === CONSTANTS.PLATFORM.WIN_32) {
            path = res[0].path.substring(1, res[0].path.length);
          } else {
            path = res[0].path;
          }
        }
        return {
          payload: {
            outputPath: path
          }
        };
      });
  }

  public static async handleProjectPathValidation(message: any): Promise<IPayloadResponse> {
    const projectPath = message.projectPath;
    const projectName = message.projectName;

    let projectPathError = "";
    let isInvalidProjectPath = false;

    let validationObject = Validator.isValidProjectPath(
      projectPath,
      projectName
    );

    projectPathError = validationObject.error;
    isInvalidProjectPath = !validationObject.isValid;

    return {
      payload: {
        projectPathValidation: {
          isInvalidProjectPath: isInvalidProjectPath,
          projectPathError: projectPathError
        }
      }
    };
  }

  private static isValidProjectPath = (path: string, name: string) => {
    let isValid = true;
    let error = "";

    if (!fs.existsSync(path) && path !== "") {
      error = CONSTANTS.ERRORS.INVALID_OUTPUT_PATH(path);
      isValid = false;
    } else if (name !== "" && !Validator.isUniquePath(path, name)) {
      error = CONSTANTS.ERRORS.PROJECT_PATH_EXISTS(path, name);
      isValid = false;
    }
    return {
      isValid: isValid,
      error: error
    };
  }

  private static isUniquePath = (projectPath: string, name: string) => {
    return !fs.existsSync(path.join(projectPath, name));
  }
}
