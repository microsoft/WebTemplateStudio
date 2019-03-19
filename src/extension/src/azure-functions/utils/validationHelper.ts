import { FunctionSelections } from "../functionProvider";
import { ValidationError } from "../../errors";
import { CONSTANTS } from "../../constants";

export namespace ValidationHelper {
  export function validate(selections: FunctionSelections): void {
    validateFunctionNames(selections.functionNames);
    validateFunctionAppName(selections.functionAppName);
  }

  function validateFunctionNames(names: string[]): void {
    for (var name of names) {
      checkFunctionNameRegex(name);
      if (
        name.length > CONSTANTS.FUNCTIONS_CONFIG.MAX_NAME_LEN ||
        name.length < CONSTANTS.FUNCTIONS_CONFIG.MIN_NAME_LEN
      ) {
        throw new ValidationError(
          CONSTANTS.ERRORS.NAME_MIN_MAX(
            CONSTANTS.FUNCTIONS_CONFIG.MIN_NAME_LEN,
            CONSTANTS.FUNCTIONS_CONFIG.MAX_NAME_LEN
          )
        );
      }
    }

    names = names.map(function(name) {
      return name.toLowerCase();
    });

    if (new Set(names).size !== names.length) {
      throw new ValidationError(CONSTANTS.ERRORS.FUNCTIONS_NO_DUPLICATES);
    }
  }

  export function validateFunctionAppName(name: string): void {
    checkFunctionNameRegex(name);

    if (
      name.length > CONSTANTS.FUNCTIONS_CONFIG.MAX_NAME_LEN ||
      name.length < CONSTANTS.FUNCTIONS_CONFIG.MIN_NAME_LEN
    ) {
      throw new ValidationError(
        CONSTANTS.ERRORS.NAME_MIN_MAX(
          CONSTANTS.FUNCTIONS_CONFIG.MIN_NAME_LEN,
          CONSTANTS.FUNCTIONS_CONFIG.MAX_NAME_LEN
        )
      );
    }
  }

  function checkFunctionNameRegex(name: string): void {
    let regexp = /^[a-zA-Z0-9]+[a-zA-Z0-9-]+[a-zA-Z0-9]+$/;
    if (!regexp.test(name)) {
      throw new ValidationError(CONSTANTS.ERRORS.FUNCTIONS_INVALID_NAME(name));
    }
  }
}
