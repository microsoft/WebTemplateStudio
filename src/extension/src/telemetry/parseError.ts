import * as os from 'os';

export interface IParsedError {
    errorType: string;
    message: string;
    stack?: string;
    isUserCancelledError: boolean;
}

export function parseError(error: any): IParsedError {
    let errorType: string = '';
    let message: string = '';
    let stack: string | undefined;

    if (typeof (error) === 'object' && error !== null) {
        if (error.constructor !== Object) {
            errorType = error.constructor.name;
        }

        stack = getCallstack(error);

        error = unpackErrorFromField(error, 'value');
        error = unpackErrorFromField(error, '_value');
        error = unpackErrorFromField(error, 'error');
        if (Array.isArray(error.errors) && error.errors.length) {
            error = error.errors[0];
        }

        errorType = getCode(error, errorType);
        message = getMessage(error, message);

    } else if (error !== undefined && error !== null && error.toString && error.toString().trim() !== '') {
        errorType = typeof (error);
        message = error.toString();
    }

    message = unpackErrorsInMessage(message);

    // tslint:disable-next-line:strict-boolean-expressions
    errorType = errorType || typeof (error);
    message = message || 'Unknown Error';

    return {
        errorType: errorType,
        message: message,
        stack: stack,
        isUserCancelledError: errorType === 'UserCancelledError'
    };
}

function getMessage(o: any, defaultMessage: string): string {
    return (o && (o.message || o.Message )) || defaultMessage;
}

function getCode(o: any, defaultCode: string): string {
    const code: any = o && (o.code || o.Code || o.errorCode || o.statusCode);
    return code ? String(code) : defaultCode;
}

function unpackErrorFromField(error: any, prop: string): any {
    // Handle objects from Azure SDK that contain the error information in a "body" field (serialized or not)
    let field: any = error && error[prop];
    if (field) {
        if (typeof field === 'string' && field.indexOf('{') >= 0) {
            try {
                field = JSON.parse(field);
            } catch (err) {
                // Ignore
            }
        }

        if (typeof field === 'object') {
            return field;
        }
    }

    return error;
}
function unpackErrorsInMessage(message: string): string {
    // Handle messages like this from Azure (just handle first error for now)
    //   ["Errors":["The offer should have valid throughput]]",
    if (message) {
        const errorsInMessage: RegExpMatchArray | null = message.match(/"Errors":\[\s*"([^"]+)"/);
        if (errorsInMessage !== null) {
            const [, firstError] = errorsInMessage;
            return firstError;
        }
    }

    return message;
}

function getCallstack(error: { stack?: string }): string | undefined {
    // tslint:disable-next-line: strict-boolean-expressions
    const stack: string = error.stack || '';

    // Standardize to using '/' for path separator for all platforms
    let result: string = stack.replace(/\\/g, '/');

    // Standardize newlines
    result = result.replace(/\r\n/g, '\n');

    // Get rid of the redundant first lines "<errortype>: <errormessage>", start with first line with "at"
    const atMatch: RegExpMatchArray | null = result.match(/^\s*at\s.*/ms);
    result = atMatch ? atMatch[0] : '';

    // Trim each line, including getting rid of 'at'
    result = result.replace(/^\s*(at\s)?\s*/mg, '');
    result = result.replace(/\s+$/mg, '');

    // Remove username if it still exists
    result = result.replace(os.userInfo().username, '<user>');

    return !!result ? result : undefined;
}
