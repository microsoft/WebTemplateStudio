/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as fse from "fs-extra";
import * as path from "path";
import { Uri, workspace, WorkspaceConfiguration } from "vscode";
import { CONSTANTS } from "../../constants";

export namespace Settings {
  export async function setDeployDefault(id: string, path: string) {
    await updateWorkspaceSetting("defaultWebAppToDeploy", id, path);
  }

  export async function enableScmDoBuildDuringDeploy(
    fsPath: string,
    runtime?: string
  ) {
    await fse.writeFile(
      path.join(fsPath, CONSTANTS.APP_SERVICE_DEPLOYMENT.DEPLOYMENT_FILE_NAME),
      CONSTANTS.APP_SERVICE_DEPLOYMENT.DEPLOYMENT_FILE
    );
  }

  async function updateWorkspaceSetting<T = string>(
    section: string,
    value: T,
    fsPath: string,
    prefix: string = "appService"
  ): Promise<void> {
    const projectConfiguration: WorkspaceConfiguration = workspace.getConfiguration(
      prefix,
      Uri.file(fsPath)
    );
    await projectConfiguration.update(section, value);
  }
}
