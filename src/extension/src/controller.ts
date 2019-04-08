import * as vscode from "vscode";
import { Validator } from "./utils/validator";
import {
  CONSTANTS,
  ExtensionModule,
  TelemetryEventName,
  SyncStatus,
  AzureResourceType
} from "./constants";
import { ReactPanel } from "./reactPanel";
import ApiModule from "./apiModule";
import { AzureServices } from "./azure/azureServices";
import { ChildProcess } from "child_process";
import { TelemetryAI, IActionContext } from "./telemetry/telemetryAI";
import { Extensible } from "./extensible";

export class Controller {
  private static reactPanelContext: ReactPanel;
  private static Telemetry: TelemetryAI;
  private static AzureService: AzureServices = new AzureServices();
  // This will map commands from the client to functions.

  private static extensionModuleMap: Map<
  ExtensionModule,
    Extensible
  > = new Map([
    [ExtensionModule.Azure, Controller.AzureService],
    // [
    //   ExtensionCommand.GetOutputPath,
    //   Controller.sendOutputPathSelectionToClient
    // ],
    [ExtensionModule.Telemetry, Controller.Telemetry],
    // [ExtensionCommand.Generate, Controller.handleGeneratePayloadFromClient],
    // [
    //   ExtensionCommand.ProjectPathValidation,
    //   Controller.handleProjectPathValidation
    // ],
    // [ExtensionCommand.OpenProjectVSCode, Controller.openProjectVSCode]
  ]);

  private static routingMessageReceieverDelegate = async function(message: any) {
    let registeredModules = Array.from( Controller.extensionModuleMap.keys())
    let clientCommand: string = message.command;

    let extensionModule = registeredModules.find(registeredModule => clientCommand.indexOf(registeredModule.valueOf()) === 0);
    if(extensionModule){
    let classModule = Controller.extensionModuleMap.get(extensionModule);
      if (classModule) {
        let payload = await classModule.routingMessageReceieverDelegate(message, Controller.Telemetry);
        Controller.handleValidMessage(message.command, payload!.payload);
      }
      else{
        vscode.window.showErrorMessage(CONSTANTS.ERRORS.INVALID_COMMAND);
      }
    }
    else {
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
          vscode.window.showErrorMessage(
            CONSTANTS.ERRORS.TOO_MANY_FAILED_SYNC_REQUESTS
          );
          this.properties.Status =
            CONSTANTS.ERRORS.TOO_MANY_FAILED_SYNC_REQUESTS;
          return process;
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

  //To be addressed in next PR for page/navigation tracking
  public static trackOnPageChangeInTelemetry(payload: any): any {
    Controller.Telemetry.trackWizardPageTimeToNext(payload.pageName);
  }

  public static handleProjectPathValidation(message: any) {
    const projectPath = message.projectPath;
    const projectName = message.projectName;

    let projectPathError = "";
    let isInvalidProjectPath = false;

    let validationObject = Validator.isValidProjectPath(
      projectPath,
      projectName
    );

    projectPathError = validationObject.error;
    isInvalidProjectPath = !validationObject.isValid;

    Controller.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.ProjectPathValidation,
      payload: {
        projectPathValidation: {
          isInvalidProjectPath: isInvalidProjectPath,
          projectPathError: projectPathError
        }
      }
    });
  }
 
  // tslint:disable-next-line: max-func-body-length
  public static async handleGeneratePayloadFromClient(
    message: any
  ): Promise<any> {
    Controller.Telemetry.trackWizardTotalSessionTimeToGenerate();
    var payload = message.payload;
    var enginePayload: any = payload.engine;

    const apiGenResult = await Controller.sendTemplateGenInfoToApiAndSendStatusToClient(
      enginePayload
    ).catch(error => {
      console.log(error);
      Controller.reactPanelContext.postMessageWebview({
        command: ExtensionCommand.UpdateGenStatus,
        payload: {
          templates: Controller.getProgressObject(false),
          cosmos: Controller.getProgressObject(false),
          azureFunctions: Controller.getProgressObject(false)
        }
      });
      return;
    });

    let progressObject = {
      templates: Controller.getProgressObject(true),
      cosmos: {},
      azureFunctions: {}
    };

    Controller.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.UpdateGenStatus,
      payload: progressObject
    });

    var serviceQueue: Promise<any>[] = [];
    enginePayload.path = apiGenResult.generationOutputPath;

    Controller.handleValidMessage(ExtensionCommand.GetOutputPath, {
      outputPath: enginePayload.path
    });

    if (payload.selectedFunctions) {
      serviceQueue.push(
        Controller.Telemetry.callWithTelemetryAndCatchHandleErrors(
          TelemetryEventName.FunctionsDeploy,
          // tslint:disable-next-line: no-function-expression
          async function(this: IActionContext): Promise<void> {
            try {
              AzureServices.deployFunctionApp(
                payload.functions,
                enginePayload.path
              );
              progressObject = {
                ...progressObject,
                azureFunctions: Controller.getProgressObject(true)
              };
              Controller.reactPanelContext.postMessageWebview({
                command: ExtensionCommand.UpdateGenStatus,
                payload: progressObject
              });
            } catch (error) {
              console.log(error);
              progressObject = {
                ...progressObject,
                azureFunctions: Controller.getProgressObject(false)
              };
              Controller.reactPanelContext.postMessageWebview({
                command: ExtensionCommand.UpdateGenStatus,
                payload: progressObject
              });
            }
          }
        )
      );
    }

    if (payload.selectedCosmos) {
      serviceQueue.push(
        Controller.Telemetry.callWithTelemetryAndCatchHandleErrors(
          TelemetryEventName.CosmosDBDeploy,
          // tslint:disable-next-line: no-function-expression
          async function(this: IActionContext): Promise<void> {
            var cosmosPayload: any = payload.cosmos;
            try {
              var dbObject = await AzureServices.deployCosmosResource(
                cosmosPayload,
                enginePayload.path
              );
              progressObject = {
                ...progressObject,
                cosmos: Controller.getProgressObject(true)
              };
              Controller.reactPanelContext.postMessageWebview({
                command: ExtensionCommand.UpdateGenStatus,
                payload: progressObject
              });
              AzureServices.promptUserForCosmosReplacement(
                enginePayload.path,
                dbObject
              ).then(
                //log in telemetry how long it took replacement
                cosmosReplaceResponse => {
                  if (cosmosReplaceResponse.userReplacedEnv) {
                    Controller.Telemetry.trackCustomEventTime(
                      TelemetryEventName.ConnectionStringReplace,
                      cosmosReplaceResponse.startTime,
                      Date.now()
                    );
                  }
                }
              );
            } catch (error) {
              progressObject = {
                ...progressObject,
                cosmos: Controller.getProgressObject(false)
              };
              Controller.reactPanelContext.postMessageWebview({
                command: ExtensionCommand.UpdateGenStatus,
                payload: progressObject
              });
            }
          }
        )
      );
    }
    // kick off both services asynchronously
    Promise.all(serviceQueue);
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

  public static sendOutputPathSelectionToClient(message: any) {
    vscode.window
      .showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false
      })
      .then((res: any) => {
        let path = undefined;

        if (res !== undefined) {
          if (process.platform === CONSTANTS.PLATFORM.WIN_32) {
            path = res[0].path.substring(1, res[0].path.length);
          } else {
            path = res[0].path;
          }
        }

        Controller.handleValidMessage(ExtensionCommand.GetOutputPath, {
          outputPath: path
        });
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

  private static openProjectVSCode(message: any) {
    vscode.commands.executeCommand(
      CONSTANTS.VSCODE_COMMAND.OPEN_FOLDER,
      vscode.Uri.file(message.payload.outputPath),
      true
    );
  }

  private static getProgressObject(didSucceed: boolean) {
    return {
      success: didSucceed,
      failure: !didSucceed
    };
  }
}
