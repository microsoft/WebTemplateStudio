import * as vscode from "vscode";
import { CONSTANTS } from "./constants";
import { ApiModule } from "./signalr-api-module/apiModule";
import { ISyncReturnType } from "./types/syncReturnType";
import { IVSCodeProgressType } from "./types/vscodeProgressType";

export class LaunchExperience {
  private static _progressObject: vscode.Progress<IVSCodeProgressType>;

  constructor(progressObject: vscode.Progress<IVSCodeProgressType>) {
    LaunchExperience._progressObject = progressObject;
  }

  public async launchApiSyncModule(
    context: vscode.ExtensionContext
  ): Promise<ISyncReturnType> {
    await ApiModule.StartApi(context);

    LaunchExperience._progressObject.report({
      message: CONSTANTS.INFO.STARTING_GENERATION_SERVER
    });

    let syncObject: ISyncReturnType = {
      successfullySynced: false,
      templatesVersion: ""
    };
    let syncAttempts = 0;
    while (
      !syncObject.successfullySynced &&
      syncAttempts < CONSTANTS.API.MAX_SYNC_REQUEST_ATTEMPTS
    ) {
      syncObject = await this.attemptSync();
      syncAttempts++;
      if (!syncObject.successfullySynced) {
        await this.timeout(CONSTANTS.API.SYNC_RETRY_WAIT_TIME);
      }
    }
    if (syncAttempts >= CONSTANTS.API.MAX_SYNC_REQUEST_ATTEMPTS) {
      ApiModule.StopApi();
      throw new Error(CONSTANTS.ERRORS.TOO_MANY_FAILED_SYNC_REQUESTS);
    }

    return { ...syncObject };
  }

  private timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async attemptSync(): Promise<ISyncReturnType> {
    let pathToTemplates: string;

    if (process.env.NODE_ENV === "dev") {
      pathToTemplates = CONSTANTS.API.DEVELOPMENT_PATH_TO_TEMPLATES;
    } else {
      pathToTemplates = CONSTANTS.API.PRODUCTION_PATH_TO_TEMPLATES;
    }


    return await ApiModule.ExecuteApiCommand({
      port: ApiModule.GetLastUsedPort(),
      payload: { path: pathToTemplates },
      liveMessageHandler: this.handleSyncLiveData
    })
      .then((syncResult: any) => {
        return {
          successfullySynced: true,
          templatesVersion: syncResult.templatesVersion
        };
      })
      .catch(() => {
        return { successfullySynced: false, templatesVersion: "" };
      });
  }

  private handleSyncLiveData(status: string, progress?: number) {
    let output = `Templates - ${status}`;
    let increment: number | undefined;

    if (progress) {
      output += ` ${progress}%`;
      increment = 1;
    }

    LaunchExperience._progressObject.report({
      message: output,
      increment
    });

    vscode.window.setStatusBarMessage(output, 2000);
  }
}
