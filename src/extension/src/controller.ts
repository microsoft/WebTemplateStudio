import * as vscode from "vscode";
import { Validator } from "./utils/validator";
import {
  CONSTANTS,
  ExtensionModule,
  TelemetryEventName,
  SyncStatus,
  ExtensionCommand
} from "./constants";
import { ReactPanel } from "./reactPanel";
import ApiModule from "./apiModule";
import { AzureServices } from "./azure/azureServices";
import { ChildProcess } from "child_process";
import { TelemetryAI, IActionContext } from "./telemetry/telemetryAI";
import { Extensible } from "./extensible";
import { GenerationExperience } from "./generationExperience";

export class Controller {
  public static reactPanelContext: ReactPanel;
  public static Telemetry: TelemetryAI;
  private static AzureService: AzureServices = new AzureServices();
  private static GenExperience: GenerationExperience = new GenerationExperience(
    Controller.reactPanelContext,
    Controller.Telemetry
  );
  private static Validator: Validator = new Validator();
  // This will map commands from the client to functions.

  private static extensionModuleMap: Map<ExtensionModule, Extensible> = new Map(
    [
      [ExtensionModule.Azure, Controller.AzureService],
      [ExtensionModule.Validator, Controller.Validator],
      [ExtensionModule.Telemetry, Controller.Telemetry],
      [ExtensionModule.Generate, Controller.GenExperience]
      // [
      //   ExtensionCommand.ProjectPathValidation,
      //   Controller.handleProjectPathValidation
      // ],
    ]
  );

  private static routingMessageReceieverDelegate = async function(
    message: any
  ) {
    let extensionModule = message.module;

    if (extensionModule) {
      let classModule = Controller.extensionModuleMap.get(extensionModule);
      if (classModule) {
        let payload = await classModule.callCommandSpecifiedByPayload(
          message,
          Controller.Telemetry
        );
        if (payload) {
          Controller.handleValidMessage(message.command, payload.payload);
        }
      } else {
        vscode.window.showErrorMessage(CONSTANTS.ERRORS.INVALID_COMMAND);
      }
    } else {
      vscode.window.showErrorMessage(CONSTANTS.ERRORS.INVALID_COMMAND);
    }
  };

  /**
   * launchWizard
   * Will launch the api, sync templates then pass in a routing function delegate to the ReactPanel
   *  @param VSCode context interface
   */
  public static async launchWizard(
    context: vscode.ExtensionContext,
    extensionStartTime: number
  ): Promise<any> {
    Controller.Telemetry = new TelemetryAI(context, extensionStartTime);
    this.Telemetry.callWithTelemetryAndCatchHandleErrors(
      TelemetryEventName.SyncEngine,
      async function(this: IActionContext): Promise<ChildProcess> {
        let process = ApiModule.StartApi(context);
        let synced = false;
        let syncAttempts = 0;
        while (
          !synced &&
          syncAttempts < CONSTANTS.API.MAX_SYNC_REQUEST_ATTEMPTS
        ) {
          synced = await Controller.attemptSync();
          syncAttempts++;
          if (!synced) {
            await Controller.timeout(CONSTANTS.API.SYNC_RETRY_WAIT_TIME);
          }
        }
        if (syncAttempts >= CONSTANTS.API.MAX_SYNC_REQUEST_ATTEMPTS) {
          process.kill();
          throw new Error(
            CONSTANTS.ERRORS.TOO_MANY_FAILED_SYNC_REQUESTS
          );
        }

        Controller.reactPanelContext = ReactPanel.createOrShow(
          context.extensionPath,
          Controller.routingMessageReceieverDelegate
        );
        Controller.Telemetry.trackExtensionStartUpTime(
          TelemetryEventName.ExtensionLaunch
        );
        return process;
      }
    );
  }

  private static timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private static async attemptSync(): Promise<boolean> {
    return await ApiModule.SendSyncRequestToApi(
      CONSTANTS.PORT,
      CONSTANTS.API.PATH_TO_TEMPLATES,
      this.handleSyncLiveData
    )
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
  private static handleSyncLiveData(status: SyncStatus) {
    vscode.window.showInformationMessage(
      CONSTANTS.INFO.SYNC_STATUS + ` ${status}`
    );
  }

  public static async sendTemplateGenInfoToApiAndSendStatusToClient(
    enginePayload: any
  ) {
    return await ApiModule.SendTemplateGenerationPayloadToApi(
      CONSTANTS.PORT,
      enginePayload,
      this.handleGenLiveMessage
    );
  }

  private static handleGenLiveMessage(message: any) {
    vscode.window.showInformationMessage(message);
    Controller.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.UpdateGenStatusMessage,
      payload: {
        status: message
      }
    });
  }

  public static handleValidMessage(command: ExtensionCommand, payload?: any) {
    Controller.reactPanelContext.postMessageWebview({
      command: command,
      payload: payload,
      message: ""
    });
  }

  public static handleErrorMessage(
    command: ExtensionCommand,
    error: Error,
    payload?: any
  ) {
    Controller.reactPanelContext.postMessageWebview({
      command: command,
      payload: payload,
      message: error.message,
      errorType: error.name
    });
  }
}
