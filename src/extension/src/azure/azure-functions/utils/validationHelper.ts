import { CONSTANTS, AppType } from "../../../constants";

export interface AppNameValidationResult {
  isValid: boolean;
  message: string;
}

export namespace ValidationHelper {
  // const MAX_NAME_LEN = 60;
  // const MIN_NAME_LEN = 3;

  export function validateFunctionNames(
    names: string[]
  ): AppNameValidationResult {
    for (var name of names) {
      if (name.length > CONSTANTS.APP_NAME.MAX_LENGTH || name.length < CONSTANTS.APP_NAME.MIN_LENGTH) {
        return {
          isValid: false,
          message: CONSTANTS.ERRORS.NAME_MIN_MAX(CONSTANTS.APP_NAME.MIN_LENGTH, CONSTANTS.APP_NAME.MAX_LENGTH)
        };
      }
      let regexResult: AppNameValidationResult = checkAppNameRegex(name);
      if (!regexResult.isValid) {
        return regexResult;
      }
    }

    names = names.map(name => {
      return name.toLowerCase();
    });

    if (new Set(names).size !== names.length) {
      return {
        isValid: false,
        message: CONSTANTS.ERRORS.FUNCTIONS_NO_DUPLICATES
      };
    }

    return { isValid: true, message: "" };
  }

  // For validating Function App and Web App names
  export function validateAppName(
    name: string
  ): AppNameValidationResult {
    if (name.length > CONSTANTS.APP_NAME.MAX_LENGTH || name.length < CONSTANTS.APP_NAME.MIN_LENGTH) {
      return {
        isValid: false,
        message: CONSTANTS.ERRORS.NAME_MIN_MAX(CONSTANTS.APP_NAME.MIN_LENGTH, CONSTANTS.APP_NAME.MAX_LENGTH)
      };
    }

    return checkAppNameRegex(name);
  }

  function checkAppNameRegex(name: string): AppNameValidationResult {
    let regexp = /^[a-zA-Z0-9]+[a-zA-Z0-9-]*[a-zA-Z0-9]+$/;
    if (!regexp.test(name)) {
      return {
        isValid: false,
        message: CONSTANTS.ERRORS.APP_INVALID_NAME(name, AppType.Function)
      };
    }
    return { isValid: true, message: "" };
  }
}
