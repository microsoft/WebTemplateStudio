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
    [ExtensionCommand.GetOutputPath, Validator.sendOutputPathSelectionToClient]
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

  public static isAlphaNumeric = (name: string) => {
    return /^[\w ]+$/i.test(name);
  }

  public static isEmpty = (name: string) => {
    return name === "" || name === undefined;
  }

  public static isValidProjectName = (name: string) => {
    if (Validator.isEmpty(name)) {
      throw Error(CONSTANTS.ERRORS.EMPTY_PROJECT_NAME);
    } else if (!Validator.isAlphaNumeric(name)) {
      throw Error(CONSTANTS.ERRORS.INVALID_PROJECT_NAME(name));
    } else if (name.length > CONSTANTS.MAX_PROJECT_NAME_LENGTH) {
      throw Error(CONSTANTS.ERRORS.PROJECT_NAME_LENGTH_EXCEEDED_MAX);
    }
    return true;
  }

  public static isValidProjectPath = (path: string, name: string) => {
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

  public static isUniquePath = (projectPath: string, name: string) => {
    return !fs.existsSync(path.join(projectPath, name));
  }
}
