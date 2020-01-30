import * as fse from "fs-extra";
import * as path from "path";
import { CONSTANTS } from "../../constants";

export namespace Settings {
  export async function setDeployDefault(id: string, fsPath: string): Promise<void> {
    const dotVSCodeFolder = path.join(
      fsPath,
      CONSTANTS.APP_SERVICE_DEPLOYMENT.DOT_VSCODE_FOLDER
    );
    const vsCodeFolderExists = await fse.pathExists(dotVSCodeFolder);
    if (!vsCodeFolderExists) {
      await fse.mkdir(dotVSCodeFolder);
    }
    const settingPath = path.join(
      dotVSCodeFolder,
      CONSTANTS.APP_SERVICE_DEPLOYMENT.SETTINGS_FILE_NAME
    );
    await fse.writeFile(
      settingPath,
      CONSTANTS.APP_SERVICE_DEPLOYMENT.SETTINGS_FILE(
        id,
        CONSTANTS.APP_SERVICE_DEPLOYMENT.SERVER_FOLDER
      )
    );
  }

  export async function enableScmDoBuildDuringDeploy(fsPath: string): Promise<void> {
    await fse.writeFile(
      path.join(
        fsPath,
        CONSTANTS.APP_SERVICE_DEPLOYMENT.SERVER_FOLDER,
        CONSTANTS.APP_SERVICE_DEPLOYMENT.DEPLOYMENT_FILE_NAME
      ),
      CONSTANTS.APP_SERVICE_DEPLOYMENT.DEPLOYMENT_FILE
    );
  }
}
