import { CONSTANTS } from "../../constants/constants";
import { MESSAGES } from "../../constants/messages";

export interface AppNameValidationResult {
  isValid: boolean;
  // message refers to error message, if isValid is true, there is no message
  message: string;
}

export namespace NameValidator {
  function checkNameRegex(name: string): AppNameValidationResult {
    const regexp = /^[a-zA-Z0-9]+[a-zA-Z0-9-]*[a-zA-Z0-9]+$/;
    if (!regexp.test(name)) {
      return {
        isValid: false,
        message: MESSAGES.ERRORS.APP_INVALID_NAME(name),
      };
    }
    return { isValid: true, message: "" };
  }

  // For validating Web App names
  export function validateAppName(name: string): AppNameValidationResult {
    if (name.length > CONSTANTS.APP_NAME.MAX_LENGTH || name.length < CONSTANTS.APP_NAME.MIN_LENGTH) {
      return {
        isValid: false,
        message: MESSAGES.ERRORS.NAME_MIN_MAX(CONSTANTS.APP_NAME.MIN_LENGTH, CONSTANTS.APP_NAME.MAX_LENGTH),
      };
    }
    return checkNameRegex(name);
  }
}
