import { CONSTANTS } from "../constants";
import fs = require("fs");
import path = require("path");

export abstract class Validator {
  public static isAlphaNumeric = (name: string) => {
    return /^[\w ]+$/i.test(name);
  };

  public static isEmpty = (name: string) => {
    return name === "" || name === undefined;
  };

  public static isValidProjectName = (name: string) => {
    if (Validator.isEmpty(name)) {
      throw Error(CONSTANTS.ERRORS.EMPTY_PROJECT_NAME);
    } else if (!Validator.isAlphaNumeric(name)) {
      throw Error(CONSTANTS.ERRORS.INVALID_PROJECT_NAME(name));
    } else if (name.length > CONSTANTS.MAX_PROJECT_NAME_LENGTH) {
      throw Error(CONSTANTS.ERRORS.PROJECT_NAME_LENGTH_EXCEEDED_MAX);
    }
    return true;
  };

  public static isValidProjectPath = (path: string, name: string) => {
    let isValid = true;
    let error = "";

    if (Validator.isEmpty(path)) {
      error = CONSTANTS.ERRORS.EMPTY_OUTPUT_PATH;
      isValid = false;
    } else if (!fs.existsSync(path)) {
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
  };

  public static isUniquePath = (projectPath: string, name: string) => {
    return !fs.existsSync(path.join(projectPath, name));
  };
}
