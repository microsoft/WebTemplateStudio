import * as vscode from "vscode";

import { Validator } from "./client-modules/validator";
import { CONSTANTS } from "./constants/constants";
import { TelemetryEventName } from './constants/telemetry';
import { ReactPanel } from "./reactPanel";
import { CoreTemplateStudio } from "./coreTemplateStudio";
import { TelemetryService, IActionContext, ITelemetryService } from "./telemetry/telemetryService";
import { Logger } from "./utils/logger";
import { WizardServant } from "./wizardServant";
import { Generation } from "./client-modules/generation";
import { IVSCodeProgressType } from "./types/vscodeProgressType";
import { LaunchExperience } from "./launchExperience";
import { DependenciesModule } from "./client-modules/dependenciesModule";
import { CoreTSModule } from "./client-modules/coreTSModule";
import { Defaults } from "./client-modules/defaults";
import { Telemetry } from "./client-modules/telemetry";
import { AzureModule } from "./client-modules/azureModule";
import { getExtensionName, getExtensionVersionNumber } from "./utils/packageInfo";
import { ISyncReturnType } from "./types/syncReturnType";
import { LoggerModule } from "./client-modules/loggerModule";
import { MESSAGES } from "./constants/messages";
import { ExtensionModule } from "./constants/commands";
import { EXTENSION_COMMANDS } from "./constants/commands";

export class Controller {
  /**
   * The singleton instance of Controller
   * @type: {Controller}
   */
  private static _instance: Controller | undefined;
  public static reactPanelContext: ReactPanel;
  public static TelemetryService: ITelemetryService;
  public static Logger: Logger;
  private loggerModule: LoggerModule;
  private AzureModule: AzureModule;
  private Generation: Generation;
  private Validator: Validator;
  private dependencies: DependenciesModule;
  private CoreTSModule: CoreTSModule;
  private Telemetry: Telemetry;
  private Defaults: Defaults;
  private SyncCompleted = false;
  public static vsContext: vscode.ExtensionContext;

  /**
   *  Defines the WizardServant modules to which wizard client commands are routed
   */
  private static extensionModuleMap: Map<ExtensionModule, WizardServant>;
  private defineExtensionModule(): void {
    Controller.extensionModuleMap = new Map([
      [ExtensionModule.Telemetry, this.Telemetry],
      [ExtensionModule.Azure, this.AzureModule],
      [ExtensionModule.Validator, this.Validator],
      [ExtensionModule.Generate, this.Generation],
      [ExtensionModule.Logger, this.loggerModule],
      [ExtensionModule.DependencyChecker, this.dependencies],
      [ExtensionModule.CoreTSModule, this.CoreTSModule],
      [ExtensionModule.Defaults, this.Defaults]
    ]);
  }

  /**
   * This is the function behavior map passed to the ReactPanel (wizard client)
   * @param message The payload received from the wizard client. Message payload must include field 'module'
   */
  private async routingMessageReceieverDelegate(message: any): Promise<void> {
    const extensionModule = message.module;

    if (extensionModule) {
      const classModule = Controller.extensionModuleMap.get(extensionModule);
      if (classModule) {
        const responsePayload = await WizardServant.executeWizardCommandOnServantClass(
          message,
          classModule,
          Controller.TelemetryService
        );
        if (responsePayload) {
          Controller.handleValidMessage(message.command, message.payload, responsePayload);
        }
      } else {
        vscode.window.showErrorMessage(MESSAGES.ERRORS.INVALID_COMMAND);
      }
    } else {
      vscode.window.showErrorMessage(MESSAGES.ERRORS.INVALID_MODULE);
    }
  }

  /**
   * Provides access to the Controller. Maintains Singleton Pattern. Function will bring up ReactPanel to View if Controller instance exists, otherwise will instantiate a new Controller.
   * @param message The payload received from the wizard client. Message payload must include field 'module'
   * @returns Singleton Controller type
   */
  public static getInstance(
    context: vscode.ExtensionContext,
    platform: string
  ): Controller {
    if (this._instance) {
      this._instance.showReactPanel();
    } else {
      this._instance = new Controller(context, platform);
    }
    return this._instance;
  }

  private constructor(
    private context: vscode.ExtensionContext,
    private platform : string
  ) {
    Controller.vsContext = context;
    Controller.TelemetryService = new TelemetryService(
      this.context
    );

    Controller.TelemetryService.trackEvent(TelemetryEventName.ExtensionLaunch);

    this.Validator = new Validator();
    this.AzureModule = new AzureModule();
    this.Generation = new Generation(Controller.TelemetryService);
    this.loggerModule = new LoggerModule();
    this.dependencies = new DependenciesModule();
    this.CoreTSModule = new CoreTSModule();
    this.Telemetry = new Telemetry(Controller.TelemetryService);
    this.Defaults = new Defaults();
    Logger.load(this.context.extensionPath);
    Logger.initializeOutputChannel(getExtensionName(this.context));
    this.defineExtensionModule();
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Launching WebTS"
      },
      async (progress: vscode.Progress<IVSCodeProgressType>) => {
        const launchExperience = new LaunchExperience(progress);
        await this.launchWizard(this.context, launchExperience, this.platform);
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
    launchExperience: LaunchExperience,
    platform: string
  ): Promise<void> {
     let syncObject
     await Controller.TelemetryService.callWithTelemetryAndCatchHandleErrors(
      TelemetryEventName.SyncEngine,
      async function(this: IActionContext) {
        return await launchExperience
          .launchApiSyncModule(context, platform)
          .then(data => syncObject=data)
          .catch(error => {
            console.log(error);
            CoreTemplateStudio.DestroyInstance();
            throw error;
          });
      }
    );

    if (syncObject) {
      this.SyncCompleted = true;
      Controller.reactPanelContext = ReactPanel.createOrShow(this.routingMessageReceieverDelegate);

      Controller.getTemplateInfoAndStore(
        context,
        syncObject,
        platform
      );
      this.Telemetry.trackCreateNewProject({
        entryPoint: CONSTANTS.TELEMETRY.LAUNCH_WIZARD_STARTED_POINT
      });
    }
  }

  private static getTemplateInfoAndStore(
    ctx: vscode.ExtensionContext,
    syncObject: ISyncReturnType,
    platform: string
  ): void {
    const preview = vscode.workspace
      .getConfiguration()
      .get<boolean>("wts.enablePreviewMode");

    CoreTemplateStudio._templateConfig = {
      templatesVersion:syncObject.templatesVersion,
      wizardVersion: getExtensionVersionNumber(ctx),
      itemNameValidationConfig: syncObject.itemNameValidationConfig,
      projectNameValidationConfig: syncObject.projectNameValidationConfig,
      preview,
      platform,
    };
  }

  private static handleValidMessage(
    commandName: EXTENSION_COMMANDS,
    payload: any,
    responsePayload?: any
  ): void {
    responsePayload.command = commandName;
    if(payload && payload.scope) {
      responsePayload.payload.scope = payload.scope;
    }
    this.reactPanelContext.postMessageWebview(responsePayload);
  }

  showReactPanel(): void {
    if (ReactPanel.currentPanel) {
      ReactPanel.createOrShow(this.routingMessageReceieverDelegate);
    }
  }

  static dispose(): void {
    if(this._instance){
      Controller.TelemetryService.trackEvent(TelemetryEventName.ExtensionClosed, {
        syncCompleted: this._instance.SyncCompleted.toString()
      });
    }
    CoreTemplateStudio.DestroyInstance();
    this._instance = undefined;
  }
}
