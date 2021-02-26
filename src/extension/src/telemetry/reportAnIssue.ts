/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const opn = require("opn");
import * as vscode from "vscode";

import { getPackageInfo } from "../utils/packageInfo";
import { IParsedError } from "./parseError";

/**
 * Used to open the browser to the "New Issue" page on GitHub with relevant context pre-filled in the issue body
 */
export function reportAnIssue(
  vscodeContext: vscode.ExtensionContext,
  actionId: string,
  parsedError: IParsedError
): void {
  const { extensionName, extensionVersion, bugsUrl } = getPackageInfo(vscodeContext);

  let body = `
<!-- IMPORTANT: Please be sure to remove any private information before submitting. -->

Repro steps:
<!-- TODO: Enter steps to reproduce issue -->

1.
2.

Action: ${actionId}
Error type: ${parsedError.errorType}
Error Message: ${parsedError.message}

Version: ${extensionVersion}
OS: ${process.platform}
VS Code Version: ${vscode.version}`;

  if (parsedError.stack) {
    body = body.concat(`

<details>
<summary>Call Stack</summary>

\`\`\`
${parsedError.stack.substring(0, 5000)}
\`\`\`

</details>`);
  }

  const baseUrl: string = bugsUrl || `https://github.com/Microsoft/${extensionName}/issues`;
  const url = `${baseUrl}/new?body=${encodeURIComponent(body)}`;
  opn(url);
}
