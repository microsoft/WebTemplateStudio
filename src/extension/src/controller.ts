import * as vscode from "vscode";
import { Validator } from "./utils/validator";
import {
  CONSTANTS,
  ExtensionModule,
  TelemetryEventName,
  ExtensionCommand
} from "./constants";
import { ReactPanel } from "./reactPanel";
import { ApiModule } from "./signalr-api-module/apiModule";
import { VSCodeUI } from "./utils/vscodeUI";
import { AzureServices } from "./azure/azureServices";
import { TelemetryAI, IActionContext } from "./telemetry/telemetryAI";
import { Logger } from "./utils/logger";
import { WizardServant } from "./wizardServant";
import { GenerationExperience } from "./generationExperience";
import { IVSCodeProgressType } from "./types/vscodeProgressType";
import { LaunchExperience } from "./launchExperience";

export class Controller {
  public static reactPanelContext: ReactPanel;
  public static Telemetry: TelemetryAI;
  private vscodeUI: VSCodeUI;
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
      [ExtensionModule.VSCodeUI, this.vscodeUI],
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
    this.vscodeUI = new VSCodeUI();
    Logger.initializeOutputChannel(Controller.getExtensionName(context));
    this.Validator = new Validator();
    this.AzureService = new AzureServices();
    this.GenExperience = new GenerationExperience(Controller.Telemetry);
    this.defineExtensionModule();
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Launching WebTS"
      },
      async (progress: vscode.Progress<IVSCodeProgressType>) => {
        const launchExperience = new LaunchExperience(progress);
        await this.launchWizard(this.context, launchExperience);
      }
    );
  }

  /**
   * launchWizard
   * Will launch the api, sync templates then pass in a routing function delegate to the ReactPanel
   *  @param VSCode context interface
   */
  public async launchWizard(
    context: vscode.ExtensionContext,
    launchExperience: LaunchExperience
  ): Promise<void> {
    ApiModule.StartApi(context);

    const syncObject = await Controller.Telemetry.callWithTelemetryAndCatchHandleErrors(
      TelemetryEventName.SyncEngine,
      async function(this: IActionContext) {
        return await launchExperience.launchApiSyncModule().catch(error => {
          console.log(error);
          ApiModule.StopApi();
          throw error;
        });
      }
    );

    if (syncObject) {
      Controller.reactPanelContext = ReactPanel.createOrShow(
        context.extensionPath,
        this.routingMessageReceieverDelegate
      );
      GenerationExperience.setReactPanel(Controller.reactPanelContext);

      Controller.loadUserSettings();
      Controller.getVersionAndSendToClient(
        context,
        syncObject.templatesVersion
      );
      Controller.Telemetry.trackExtensionStartUpTime(
        TelemetryEventName.ExtensionLaunch
      );
    }
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

  private static loadUserSettings() {
    let outputPathDefault = vscode.workspace
      .getConfiguration()
      .get<string>("wts.defaultOutputPath");
    const preview = vscode.workspace
      .getConfiguration()
      .get<boolean>("wts.enablePreviewMode");
    if (outputPathDefault) {
      Controller.reactPanelContext.postMessageWebview({
        command: ExtensionCommand.GetOutputPath,
        payload: {
          outputPath: outputPathDefault
        }
      });
    }
    if (preview !== undefined) {
      Controller.reactPanelContext.postMessageWebview({
        command: ExtensionCommand.GetPreviewStatus,
        payload: {
          preview: preview
        }
      });
    }
  }

  private static handleValidMessage(
    commandName: ExtensionCommand,
    responsePayload?: any
  ) {
    responsePayload.command = commandName;
    this.reactPanelContext.postMessageWebview(responsePayload);
  }

  dispose() {
    ApiModule.StopApi();
  }
}
