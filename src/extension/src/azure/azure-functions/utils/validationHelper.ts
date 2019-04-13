import { FunctionSelections } from "../functionProvider";
import { CONSTANTS } from "../../../constants";

export interface FunctionValidationResult {
  isValid: boolean;
  message: string;
}

export namespace ValidationHelper {
  const MAX_NAME_LEN = 60;
  const MIN_NAME_LEN = 3;

  export function validate(
    selections: FunctionSelections
  ): FunctionValidationResult {
    let appNameResult: FunctionValidationResult = validateFunctionAppName(
      selections.functionAppName
    );
    if (!appNameResult.isValid) {
      return appNameResult;
    }
    let functionNameResult: FunctionValidationResult = validateFunctionNames(
      selections.functionNames
    );
    if (!functionNameResult.isValid) {
      return functionNameResult;
    }
    return { isValid: true, message: "" };
  }

  export function validateFunctionNames(
    names: string[]
  ): FunctionValidationResult {
    for (var name of names) {
      if (name.length > MAX_NAME_LEN || name.length < MIN_NAME_LEN) {
        return {
          isValid: false,
          message: CONSTANTS.ERRORS.NAME_MIN_MAX(MIN_NAME_LEN, MAX_NAME_LEN)
        };
      }
      let regexResult: FunctionValidationResult = checkFunctionNameRegex(name);
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

  export function validateFunctionAppName(
    name: string
  ): FunctionValidationResult {
    if (name.length > MAX_NAME_LEN || name.length < MIN_NAME_LEN) {
      return {
        isValid: false,
        message: CONSTANTS.ERRORS.NAME_MIN_MAX(MIN_NAME_LEN, MAX_NAME_LEN)
      };
    }

    return checkFunctionNameRegex(name);
  }

  function checkFunctionNameRegex(name: string): FunctionValidationResult {
    let regexp = /^[a-zA-Z0-9]+[a-zA-Z0-9-]*[a-zA-Z0-9]+$/;
    if (!regexp.test(name)) {
      return {
        isValid: false,
        message: CONSTANTS.ERRORS.FUNCTIONS_INVALID_NAME(name)
      };
    }
    return { isValid: true, message: "" };
  }
}
