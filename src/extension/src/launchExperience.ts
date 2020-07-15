import * as vscode from "vscode";
import { CoreTemplateStudio } from "./coreTemplateStudio";
import { ISyncReturnType } from "./types/syncReturnType";
import { IVSCodeProgressType } from "./types/vscodeProgressType";
import { Logger } from "./utils/logger";
import { MESSAGES } from "./constants/messages";
import { CLI } from "./constants/extension";

export class LaunchExperience {
  private static _progressObject: vscode.Progress<IVSCodeProgressType>;

  constructor(progressObject: vscode.Progress<IVSCodeProgressType>) {
    LaunchExperience._progressObject = progressObject;
  }

  public async launchApiSyncModule(
    context: vscode.ExtensionContext
  ): Promise<ISyncReturnType> {

    await CoreTemplateStudio.GetInstance(context)
      .catch((error: Error) => {
        error.message = MESSAGES.ERRORS.CANNOT_START_GENERATION_ENGINE.concat(" ", error.message);
        throw error;
    });

    LaunchExperience._progressObject.report({
      message: MESSAGES.INFO.STARTING_GENERATION_SERVER
    });

    let syncObject: ISyncReturnType = {
      successfullySynced: false,
      templatesVersion: "",
      errorMessage: "",
      itemNameValidationConfig: {},
      projectNameValidationConfig: {}
    };
    let syncAttempts = 0;
    while (
      !syncObject.successfullySynced &&
      syncAttempts < CLI.MAX_SYNC_REQUEST_ATTEMPTS
    ) {
      syncObject = await this.attemptSync();
      syncAttempts++;
      if (!syncObject.successfullySynced) {
        await this.timeout(CLI.SYNC_RETRY_WAIT_TIME);
      }
    }
    if (syncAttempts >= CLI.MAX_SYNC_REQUEST_ATTEMPTS) {
      CoreTemplateStudio.DestroyInstance();
      throw new Error(MESSAGES.ERRORS.TOO_MANY_FAILED_SYNC_REQUESTS(syncObject.errorMessage));
    }

    return { ...syncObject };
  }

  private timeout(ms: number): Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async attemptSync(): Promise<ISyncReturnType> {
    let pathToTemplates: string;

    if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development") {
      pathToTemplates = CLI.DEVELOPMENT_PATH_TO_TEMPLATES;
    } else {
      pathToTemplates = CLI.PRODUCTION_PATH_TO_TEMPLATES;
    }

    const apiInstance = CoreTemplateStudio.GetExistingInstance();
    return await apiInstance
      .sync({
        payload: { path: pathToTemplates },
        liveMessageHandler: this.handleSyncLiveData
      })
      .then((syncResult: any) => {
        Logger.appendLog(
          "EXTENSION",
          "info",
          "Successfully synced templates. Version: " +
          syncResult.templatesVersion
        );
        return {
          successfullySynced: true,
          templatesVersion: syncResult.templatesVersion,
          errorMessage: "",
          itemNameValidationConfig: syncResult.itemNameValidationConfig,
          projectNameValidationConfig: syncResult.projectNameValidationConfig
        };
      })
      .catch((error: Error) => {
        Logger.appendLog("EXTENSION", "error", error.message);
        return {
          successfullySynced: false,
          templatesVersion: "",
          errorMessage: error.message,
          itemNameValidationConfig: {},
          projectNameValidationConfig: {}
        };
      });
  }

  private handleSyncLiveData(status: string, progress?: number): void {
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
