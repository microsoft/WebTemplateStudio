import * as vscode from "vscode";
import { Validator } from "./utils/validator";
import {
  CONSTANTS,
  ExtensionModule,
  TelemetryEventName,
  ExtensionCommand
} from "./constants";
import { ReactPanel } from "./reactPanel";
import ApiModule from "./signalr-api-module/apiModule";
import { AzureServices } from "./azure/azureServices";
import { TelemetryAI } from "./telemetry/telemetryAI";
import { Logger } from "./utils/logger";
import { WizardServant } from "./wizardServant";
import { GenerationExperience } from "./generationExperience";
import { ISyncReturnType } from "./types/syncReturnType";
import { ChildProcess } from "child_process";

export class Controller {
  public static reactPanelContext: ReactPanel;
  public static Telemetry: TelemetryAI;
  public static Logger: Logger;
  private AzureService: AzureServices;
  private GenExperience: GenerationExperience;
  private Validator: Validator;

  /**
   *  Defines the WizardServant modules to which wizard client commands are routed
   */
  private static extensionModuleMap: Map<ExtensionModule, WizardServant>;
  private defineExtensionModule() {
    Controller.extensionModuleMap = new Map([
      [ExtensionModule.Telemetry, Controller.Telemetry],
      [ExtensionModule.Azure, this.AzureService],
      [ExtensionModule.Validator, this.Validator],
      [ExtensionModule.Generate, this.GenExperience],
      [ExtensionModule.Logger, Controller.Logger]
    ]);
  }

  /**
   * This is the function behavior map passed to the ReactPanel (wizard client)
   * @param message The payload received from the wizard client. Message payload must include field 'module'
   */
  private async routingMessageReceieverDelegate(message: any) {
    let extensionModule = message.module;

    if (extensionModule) {
      let classModule = Controller.extensionModuleMap.get(extensionModule);
      if (classModule) {
        let responsePayload = await WizardServant.executeWizardCommandOnServantClass(
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
      vscode.window.showErrorMessage(CONSTANTS.ERRORS.INVALID_MODULE);
    }
  }

  constructor(
    private context: vscode.ExtensionContext,
    private extensionStartTime: number
  ) {
    Controller.Telemetry = new TelemetryAI(
      this.context,
      this.extensionStartTime
    );
    Logger.initializeOutputChannel(Controller.getExtensionName(context));
    this.Validator = new Validator();
    this.AzureService = new AzureServices();
    this.GenExperience = new GenerationExperience(Controller.Telemetry);
    this.defineExtensionModule();
    this.launchWizard(this.context);
  }

  /**
   * launchWizard
   * Will launch the api, sync templates then pass in a routing function delegate to the ReactPanel
   *  @param VSCode context interface
   */
  public async launchWizard(
    context: vscode.ExtensionContext
  ): Promise<ChildProcess> {
    let process = ApiModule.StartApi(context);
    let syncObject: ISyncReturnType = {
      successfullySynced: false,
      templatesVersion: ""
    };
    let syncAttempts = 0;
    while (
      !syncObject.successfullySynced &&
      syncAttempts < CONSTANTS.API.MAX_SYNC_REQUEST_ATTEMPTS
    ) {
      syncObject = await Controller.attemptSync();
      syncAttempts++;
      if (!syncObject.successfullySynced) {
        await Controller.timeout(CONSTANTS.API.SYNC_RETRY_WAIT_TIME);
      }
    }
    if (syncAttempts >= CONSTANTS.API.MAX_SYNC_REQUEST_ATTEMPTS) {
      vscode.window.showErrorMessage(
        CONSTANTS.ERRORS.TOO_MANY_FAILED_SYNC_REQUESTS
      );
      ApiModule.StopApi();
      return process;
    }

    Controller.reactPanelContext = ReactPanel.createOrShow(
      context.extensionPath,
      this.routingMessageReceieverDelegate
    );
    GenerationExperience.setReactPanel(Controller.reactPanelContext);

    Controller.getVersionAndSendToClient(context, syncObject.templatesVersion);
    Controller.Telemetry.trackExtensionStartUpTime(
      TelemetryEventName.ExtensionLaunch
    );
    return process;
  }

  private static timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private static async attemptSync(): Promise<ISyncReturnType> {
    return await ApiModule.ExecuteApiCommand({
      port: CONSTANTS.PORT,
      payload: { path: CONSTANTS.API.PATH_TO_TEMPLATES },
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

  private static handleSyncLiveData(status: string, progress?: number) {
    let output = `Template Status: ${status}`;
    if (progress) {
      output += ` ${progress}%`;
    }
    vscode.window.setStatusBarMessage(output);
  }

  private static getExtensionName(ctx: vscode.ExtensionContext) {
    return this.Telemetry.getExtensionName(ctx);
  }
  private static getVersionAndSendToClient(
    ctx: vscode.ExtensionContext,
    templatesVersion: string
  ) {
    Controller.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.GetVersions,
      payload: {
        templatesVersion,
        wizardVersion: this.Telemetry.getExtensionVersionNumber(ctx)
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
