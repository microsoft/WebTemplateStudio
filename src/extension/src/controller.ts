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
import { TelemetryAI } from "./telemetry/telemetryAI";
import { Extensible } from "./extensible";
import { GenerationExperience } from "./generationExperience";

export class Controller {
  public static reactPanelContext: ReactPanel;
  public Telemetry: TelemetryAI;
  private AzureService: AzureServices = new AzureServices();
  private GenExperience: GenerationExperience;
  private Validator: Validator = new Validator();
  // This will map commands from the client to functions.

  private extensionModuleMap: Map<ExtensionModule, Extensible> = new Map(
    [
      [ExtensionModule.Azure, this.AzureService],
      [ExtensionModule.Validator, this.Validator],
      [ExtensionModule.Telemetry, this.Telemetry],
      [ExtensionModule.Generate, this.GenExperience]
    ]
  );

  private async routingMessageReceieverDelegate(
    message: any
  ) {
    let extensionModule = message.module;

    if (extensionModule) {
      let classModule = this.extensionModuleMap.get(extensionModule);
      if (classModule) {
        let payload = await classModule.callCommandSpecifiedByPayload(
          message,
          this.Telemetry
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

  constructor(
    private context: vscode.ExtensionContext,
    private extensionStartTime: number
  ){
    this.Telemetry = new TelemetryAI(this.context, this.extensionStartTime);
    this.GenExperience  = new GenerationExperience(
      Controller.reactPanelContext,
      this.Telemetry
    );
    this.launchWizard(this.context, this.extensionStartTime);
  }

  /**
   * launchWizard
   * Will launch the api, sync templates then pass in a routing function delegate to the ReactPanel
   *  @param VSCode context interface
   */
  public async launchWizard(
    context: vscode.ExtensionContext,
    extensionStartTime: number
  ): Promise<any> {
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
          this.routingMessageReceieverDelegate
        );

        this.getVersionAndSendToClient(context);        
        this.Telemetry.trackExtensionStartUpTime(
          TelemetryEventName.ExtensionLaunch
        );
        return process;
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
  private getVersionAndSendToClient(ctx: vscode.ExtensionContext) {
    Controller.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.GetVersions,
      payload: {
        templatesVersion: "1.0",
        wizardVersion: this.Telemetry.getExtensionVersionNumber(ctx)
      }
    });
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
    this.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.UpdateGenStatusMessage,
      payload: {
        status: message
      }
    });
  }

  public static handleValidMessage(command: ExtensionCommand, payload?: any) {
    this.reactPanelContext.postMessageWebview({
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
    this.reactPanelContext.postMessageWebview({
      command: command,
      payload: payload,
      message: error.message,
      errorType: error.name
    });
  }

  
  dispose() {
    throw new Error("Method not implemented.");
  }
}
