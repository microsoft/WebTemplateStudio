import * as vscode from "vscode";
import { Validator } from "./utils/validator";
import {
  CONSTANTS,
  ExtensionModule,
  TelemetryEventName,
  ExtensionCommand,
  
} from "./constants";
import { ReactPanel } from "./reactPanel";
import ApiModule from "./signalr-api-module/apiModule";
import { AzureServices } from "./azure/azureServices";
import { TelemetryAI } from "./telemetry/telemetryAI";
import { WizardServant } from "./wizardServant";
import { GenerationExperience } from "./generationExperience";

export class Controller {
  public static reactPanelContext: ReactPanel;
  public static Telemetry: TelemetryAI;
  private AzureService: AzureServices;
  private GenExperience: GenerationExperience;
  private Validator: Validator;
  // This will map commands from the client to functions.

  private static extensionModuleMap: Map<ExtensionModule, WizardServant>;
  private defineExtensionModule() {
    Controller.extensionModuleMap = new Map([
      [ExtensionModule.Telemetry, Controller.Telemetry],
      [ExtensionModule.Azure, this.AzureService],
      [ExtensionModule.Validator, this.Validator],
      [ExtensionModule.Generate, this.GenExperience]
    ]);
  }

  private async routingMessageReceieverDelegate(message: any) {
    let extensionModule = message.module;

    if (extensionModule) {
      let classModule = Controller.extensionModuleMap.get(extensionModule);
      if (classModule) {
        let responsePayload = await WizardServant.callCommandWithClass(
          message,
          classModule,
          Controller.Telemetry
        );
        if (responsePayload) {
          Controller.handleValidMessage(message.command, responsePayload);
        }
      } else {
        vscode.window.showErrorMessage(CONSTANTS.ERRORS.INVALID_COMMAND);
      }
    } else {
      vscode.window.showErrorMessage(CONSTANTS.ERRORS.INVALID_COMMAND);
    }
  }

  constructor(
    private context: vscode.ExtensionContext,
    private extensionStartTime: number
  ) {
    Controller.Telemetry = new TelemetryAI(this.context, this.extensionStartTime);
    this.Validator = new Validator();
    this.AzureService = new AzureServices();
    this.GenExperience = new GenerationExperience(
      Controller.reactPanelContext,
      Controller.Telemetry
    );
    this.defineExtensionModule();
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
    while (!synced && syncAttempts < CONSTANTS.API.MAX_SYNC_REQUEST_ATTEMPTS) {
      synced = await Controller.attemptSync();
      syncAttempts++;
      if (!synced) {
        await Controller.timeout(CONSTANTS.API.SYNC_RETRY_WAIT_TIME);
      }
    }
    if (syncAttempts >= CONSTANTS.API.MAX_SYNC_REQUEST_ATTEMPTS) {
      process.kill();
      throw new Error(CONSTANTS.ERRORS.TOO_MANY_FAILED_SYNC_REQUESTS);
    }

    Controller.reactPanelContext = ReactPanel.createOrShow(
      context.extensionPath,
      this.routingMessageReceieverDelegate
    );

    this.getVersionAndSendToClient(context);
    Controller.Telemetry.trackExtensionStartUpTime(
      TelemetryEventName.ExtensionLaunch
    );
    return process;
  }

  private static timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private static async attemptSync(): Promise<boolean> {
    return await ApiModule.ExecuteApiCommand({
      port: CONSTANTS.PORT,
      payload: { path: CONSTANTS.API.PATH_TO_TEMPLATES },
      liveMessageHandler: this.handleSyncLiveData
    })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
  private static handleSyncLiveData(status: string) {
    vscode.window.showInformationMessage(
      CONSTANTS.INFO.SYNC_STATUS + ` ${status}`
    );
  }
  private getVersionAndSendToClient(ctx: vscode.ExtensionContext) {
    Controller.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.GetVersions,
      payload: {
        templatesVersion: "1.0",
        wizardVersion: Controller.Telemetry.getExtensionVersionNumber(ctx)
      }
    });
  }
  public static async sendTemplateGenInfoToApiAndSendStatusToClient(
    enginePayload: any
  ) {
    return await ApiModule.ExecuteApiCommand({
      port: CONSTANTS.PORT,
      payload: enginePayload,
      liveMessageHandler: this.handleGenLiveMessage
    });
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

  private static handleValidMessage(
    commandName: ExtensionCommand,
    responsePayload?: any
  ) {
    responsePayload.command = commandName;
    this.reactPanelContext.postMessageWebview(responsePayload);
  }


  dispose() {
    throw new Error("Method not implemented.");
  }
}
