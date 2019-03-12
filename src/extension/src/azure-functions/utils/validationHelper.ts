import { FunctionSelections } from "../functionProvider";
import { ValidationError } from "../../errors";
import { CONSTANTS } from "../../constants";

export namespace ValidationHelper {
  export function validate(selections: FunctionSelections): void {
    validateFunctionNames(selections.functionNames);
    validateFunctionAppName(selections.functionAppName);
  }

  function validateFunctionNames(names: string[]): void {
    let regexp = /^[a-zA-Z0-9]+[a-zA-Z0-9-]+[a-zA-Z0-9]+$/;
    for (var name of names) {
      if (!regexp.test(name)) {
        throw new ValidationError(
          CONSTANTS.ERRORS.FUNCTIONS_INVALID_NAME(name)
        );
      }
      if (name.length > 60 || name.length === 0) {
        throw new ValidationError(CONSTANTS.ERRORS.NAME_MIN_MAX(1, 60));
      }
    }
    if (new Set(names).size !== names.length) {
      throw new ValidationError(CONSTANTS.ERRORS.FUNCTIONS_NO_DUPLICATES);
    }
  }

  export function validateFunctionAppName(name: string): void {
    let regexp = /^[a-zA-Z0-9]+[a-zA-Z0-9-]+[a-zA-Z0-9]+$/;
    if (!regexp.test(name)) {
      throw new ValidationError(CONSTANTS.ERRORS.FUNCTIONS_INVALID_NAME(name));
    }

    if (name.length > 60 || name.length === 0) {
      throw new ValidationError(CONSTANTS.ERRORS.NAME_MIN_MAX(1, 60));
    }
  }
}
