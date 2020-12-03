import * as vscode from "vscode";
import { CoreTemplateStudio } from "./coreTemplateStudio";
import { ISyncReturnType } from "./types/syncReturnType";
import { IVSCodeProgressType } from "./types/vscodeProgressType";
import { Logger } from "./utils/logger";
import { MESSAGES } from "./constants/messages";
import { CLI_SETTINGS } from "./constants/cli";
import retry from "p-retry";
import { ENVIRONMENT } from "./constants/constants";

export class LaunchExperience {
  private static _progressObject: vscode.Progress<IVSCodeProgressType>;

  constructor(progressObject: vscode.Progress<IVSCodeProgressType>) {
    LaunchExperience._progressObject = progressObject;
  }

  public async launchApiSyncModule(context: vscode.ExtensionContext, platform: string): Promise<ISyncReturnType> {
    await CoreTemplateStudio.GetInstance(context).catch((error: Error) => {
      error.message = MESSAGES.ERRORS.CANNOT_START_GENERATION_ENGINE.concat(" ", error.message);
      throw error;
    });

    LaunchExperience._progressObject.report({
      message: MESSAGES.INFO.STARTING_GENERATION_SERVER,
    });

    try {
      const syncObject = await retry(() => this.attemptSync(platform), {
        retries: CLI_SETTINGS.MAX_SYNC_REQUEST_ATTEMPTS,
      });

      return { ...syncObject };
    } catch (error) {
      CoreTemplateStudio.DestroyInstance();
      throw new Error(MESSAGES.ERRORS.TOO_MANY_FAILED_SYNC_REQUESTS(error.message));
    }
  }

  private async attemptSync(platform: string): Promise<ISyncReturnType> {
    try {
      const pathToTemplates =
        process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT
          ? CLI_SETTINGS.DEVELOPMENT_PATH_TO_TEMPLATES
          : CLI_SETTINGS.PRODUCTION_PATH_TO_TEMPLATES;

      const apiInstance = CoreTemplateStudio.GetExistingInstance();
      const syncResult = await apiInstance.sync({
        payload: { path: pathToTemplates, platform },
        liveMessageHandler: this.handleSyncLiveData,
      });

      Logger.appendLog("EXTENSION", "info", "Successfully synced templates. Version: " + syncResult.templatesVersion);
      return {
        successfullySynced: true,
        templatesVersion: syncResult.templatesVersion,
        errorMessage: "",
        itemNameValidationConfig: syncResult.itemNameValidationConfig,
        projectNameValidationConfig: syncResult.projectNameValidationConfig,
      };
    } catch (error) {
      Logger.appendLog("EXTENSION", "error", error.message);
      throw error;
    }
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
      increment,
    });

    vscode.window.setStatusBarMessage(output, 2000);
  }
}
