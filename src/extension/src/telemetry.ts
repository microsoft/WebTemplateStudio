/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import TelemetryReporter from 'vscode-extension-telemetry';
import { ExtensionContext } from 'vscode';

export function createReporter(context: ExtensionContext) {
    const extensionPackage = require('../package.json');
    const reporter = new TelemetryReporter(extensionPackage.name, extensionPackage.version, extensionPackage.aiKey);
    context.subscriptions.push(reporter);
    return reporter;
}
