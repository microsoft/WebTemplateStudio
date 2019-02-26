import { FunctionSelections } from '../functionProvider';
import { ValidationError } from '../../errors';

export namespace ValidationHelper {

    export function validate(selections: FunctionSelections): void {
        validateFunctionNames(selections.functionNames);
        validateFunctionAppName(selections.functionAppName);
    }

    function validateFunctionNames(names: string[]): void {
        let regexp = /^[a-zA-Z0-9]+[a-zA-Z0-9-]+[a-zA-Z0-9]+$/;
        for (var name of names) {
            if (!regexp.test(name)) {
                throw new ValidationError("Invalid name for function: " + name);
            }
        }
        if ((new Set(names)).size !== names.length) {
            throw new ValidationError("No duplicates allowed for function names");
        }
    }

    export function validateFunctionAppName(name: string): void {
        let regexp = /^[a-zA-Z0-9]+[a-zA-Z0-9-]+[a-zA-Z0-9]+$/;
        if (!regexp.test(name)) {
            throw new ValidationError("Invalid name for function: " + name);
        }

        if (name.length > 60 || name.length === 0) {
            throw new ValidationError("Function app name length must be between 1 and 60 characters");
        }
    }
}