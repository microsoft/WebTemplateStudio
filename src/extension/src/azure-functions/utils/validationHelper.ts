import { FunctionSelections } from '../functionProvider';

export abstract class ValidationHelper {
    public static validate(selections: FunctionSelections): void {
        try {
            ValidationHelper.validateFunctionNames(selections.functionNames);
            ValidationHelper.validateFunctionAppName(selections.functionAppName);
        } catch (err) {
            throw err;
        }     
    }

    private static validateFunctionNames(names: string[]): void {
        let regexp = /^[a-zA-Z0-9]+[a-zA-Z0-9-]+[a-zA-Z0-9]+$/;
        for (var name of names) {
            if (!regexp.test(name)) {
                throw new Error("Invalid name for function: " + name);
            }
        }
        if ((new Set(names)).size !== names.length) {
            throw new Error("No duplicates allowed for function names")
        }
    }

    private static validateFunctionAppName(name: string): void {
        let regexp = /^[a-zA-Z0-9]+[a-zA-Z0-9-]+[a-zA-Z0-9]+$/;
        if (!regexp.test(name)) {
            throw new Error("Invalid name for function: " + name);
        }
    }
}