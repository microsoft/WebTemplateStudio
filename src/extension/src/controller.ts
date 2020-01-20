import * as vscode from "vscode";

import { Validator } from "./utils/validator";
import {
  CONSTANTS,
  ExtensionModule,
  TelemetryEventName,
  ExtensionCommand
} from "./constants";
import { ReactPanel } from "./reactPanel";
import { CoreTemplateStudio } from "./coreTemplateStudio";
import { VSCodeUI } from "./utils/vscodeUI";
import { AzureServices } from "./azure/azureServices";
import { TelemetryService, IActionContext, ITelemetryService } from "./telemetry/telemetryService";
import { Logger } from "./utils/logger";
import { WizardServant } from "./wizardServant";
import { GenerationExperience } from "./generationExperience";
import { IVSCodeProgressType } from "./types/vscodeProgressType";
import { LaunchExperience } from "./launchExperience";
import { DependencyChecker } from "./utils/dependencyChecker";
import { CoreTSModule } from "./coreTSModule";
import { Defaults } from "./utils/defaults";
import { Telemetry } from "./client-modules/telemetry";

export class Controller {
  /**
   * The singleton instance of Controller
   * @type: {Controller}
   */
  private static _instance: Controller | undefined;
  public static reactPanelContext: ReactPanel;
  public static TelemetryService: ITelemetryService;
  private vscodeUI: VSCodeUI;
  public static Logger: Logger;
  private AzureService: AzureServices;
  private GenExperience: GenerationExperience;
  private Validator: Validator;
  private DependencyChecker: DependencyChecker;
  private CoreTSModule: CoreTSModule;
  private Telemetry: Telemetry;
  private Defaults: Defaults;
  private SyncCompleted: boolean = false;

  /**
   *  Defines the WizardServant modules to which wizard client commands are routed
   */
  private static extensionModuleMap: Map<ExtensionModule, WizardServant>;
  private defineExtensionModule() {
    Controller.extensionModuleMap = new Map([
      [ExtensionModule.Telemetry, this.Telemetry],
      [ExtensionModule.VSCodeUI, this.vscodeUI],
      [ExtensionModule.Azure, this.AzureService],
      [ExtensionModule.Validator, this.Validator],
      [ExtensionModule.Generate, this.GenExperience],
      [ExtensionModule.Logger, Controller.Logger],
      [ExtensionModule.DependencyChecker, this.DependencyChecker],
      [ExtensionModule.CoreTSModule, this.CoreTSModule],
      [ExtensionModule.Defaults, this.Defaults]
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
          Controller.TelemetryService
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
  /**
   * Provides access to the Controller. Maintains Singleton Pattern. Function will bring up ReactPanel to View if Controller instance exists, otherwise will instantiate a new Controller.
   * @param message The payload received from the wizard client. Message payload must include field 'module'
   * @returns Singleton Controller type
   */
  public static getInstance(
    context: vscode.ExtensionContext
  ) {
    if (this._instance) {
      this._instance.showReactPanel();
    } else {
      this._instance = new Controller(context);
    }
    return this._instance;
  }

  private constructor(
    private context: vscode.ExtensionContext
  ) {
    Controller.TelemetryService = new TelemetryService(
      this.context
    );

    Controller.TelemetryService.trackEvent(TelemetryEventName.ExtensionLaunch);

    this.vscodeUI = new VSCodeUI();
    this.Validator = new Validator();
    this.AzureService = new AzureServices();
    this.GenExperience = new GenerationExperience(Controller.TelemetryService);
    this.DependencyChecker = new DependencyChecker();
    this.CoreTSModule = new CoreTSModule();
    this.Telemetry = new Telemetry(Controller.TelemetryService);
    this.Defaults = new Defaults();
    Logger.initializeOutputChannel(
      Controller.TelemetryService.getExtensionName(this.context)
    );
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
    const syncObject = await Controller.TelemetryService.callWithTelemetryAndCatchHandleErrors(
      TelemetryEventName.SyncEngine,
      async function(this: IActionContext) {
        return await launchExperience
          .launchApiSyncModule(context)
          .catch(error => {
            console.log(error);
            CoreTemplateStudio.DestroyInstance();
            throw error;
          });
      }
    );

    if (syncObject) {
      this.SyncCompleted = true;
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
      this.Telemetry.trackCreateNewProject({
        entryPoint: CONSTANTS.TELEMETRY.LAUNCH_WIZARD_STARTED_POINT
      });
    }
  }

  private static getVersionAndSendToClient(
    ctx: vscode.ExtensionContext,
    templatesVersion: string
  ) {
    Controller.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.GetVersions,
      payload: {
        templatesVersion,
        wizardVersion: this.TelemetryService.getExtensionVersionNumber(ctx)
      }
    });
  }

  private static loadUserSettings() {
    const preview = vscode.workspace
      .getConfiguration()
      .get<boolean>("wts.enablePreviewMode");

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

  showReactPanel() {
    if (ReactPanel.currentPanel) {
      ReactPanel.createOrShow(
        this.context.extensionPath,
        this.routingMessageReceieverDelegate
      );
    }
  }

  static dispose() {
    if(this._instance){
      Controller.TelemetryService.trackEvent(TelemetryEventName.ExtensionClosed, {
        syncCompleted: this._instance.SyncCompleted.toString()
      });
    }
    CoreTemplateStudio.DestroyInstance();
    this._instance = undefined;
  }
}
