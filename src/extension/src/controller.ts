import * as vscode from "vscode";
import { Validator } from "./utils/validator";
import {
  CONSTANTS,
  ExtensionCommand,
  TelemetryEventName,
  SyncStatus,
  AzureResourceType,
  DialogMessages,
  DialogResponses
} from "./constants";
import {
  SubscriptionError,
  ValidationError,
  ResourceGroupError
} from "./errors";
import { ReactPanel } from "./reactPanel";
import ApiModule from "./apiModule";
import { AzureServices } from "./azure/azureServices";
import { ChildProcess } from "child_process";
import { TelemetryAI, IActionContext } from "./telemetry/telemetryAI";

export abstract class Controller {
  private static reactPanelContext: ReactPanel;
  private static Telemetry: TelemetryAI;
  // This will map commands from the client to functions.

  private static clientCommandMap: Map<
    ExtensionCommand,
    (message: any) => void
  > = new Map([
    [ExtensionCommand.Login, Controller.performLoginForSubscriptions],
    [ExtensionCommand.GetUserStatus, Controller.sendUserStatusIfLoggedIn],
    [
      ExtensionCommand.SubscriptionDataForCosmos,
      Controller.sendCosmosSubscriptionDataToClient
    ],
    [
      ExtensionCommand.SubscriptionDataForFunctions,
      Controller.sendFunctionsSubscriptionDataToClient
    ],
    [
      ExtensionCommand.NameFunctions,
      Controller.sendFunctionNameValidationStatusToClient
    ],
    [
      ExtensionCommand.NameCosmos,
      Controller.sendCosmosNameValidationStatusToClient
    ],
    [
      ExtensionCommand.GetOutputPath,
      Controller.sendOutputPathSelectionToClient
    ],
    [ExtensionCommand.TrackPageSwitch, Controller.trackOnPageChangeInTelemetry],
    [ExtensionCommand.Generate, Controller.handleGeneratePayloadFromClient],
    [ExtensionCommand.GetFunctionsRuntimes, Controller.sendFunctionRuntimes],
    [ExtensionCommand.GetCosmosAPIs, Controller.sendCosmosAPIs],
    [ExtensionCommand.OpenProjectVSCode, Controller.openProjectVSCode]
  ]);

  private static routingMessageReceieverDelegate = function(message: any) {
    let command = Controller.clientCommandMap.get(message.command);

    if (command) {
      command(message);
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


  public static performLoginForSubscriptions(message: any) {
    let isLoggedIn = Controller.Telemetry.callWithTelemetryAndCatchHandleErrors<
      boolean
    >(TelemetryEventName.PerformLogin, async function(
      this: IActionContext
    ): Promise<boolean> {
      return await AzureServices.performLogin();
    });

    if (isLoggedIn) {
      Controller.sendUserStatusIfLoggedIn(message);
    }
  }
  private static async sendUserStatusIfLoggedIn(message: any): Promise<void> {
    Controller.Telemetry.callWithTelemetryAndCatchHandleErrors(
      TelemetryEventName.GetUserLoginStatus,
      async function(this: IActionContext) {
        AzureServices.getUserInfo()
          .then(azureSubscription => {
            Controller.handleValidMessage(ExtensionCommand.Login, {
              email: azureSubscription.email,
              subscriptions: azureSubscription.subscriptions
            });
          })
          .catch((error: Error) => {
            throw error; //to log in telemetry
          });
      }
    );
  }
  public static sendCosmosSubscriptionDataToClient(message: any) {
    Controller.Telemetry.callWithTelemetryAndCatchHandleErrors(
      TelemetryEventName.SubscriptionData,
      async function(this: IActionContext): Promise<void> {
        await AzureServices.getSubscriptionData(
          message.subscription,
          AzureResourceType.Cosmos
        )
          .then(subscriptionDatapackage => {
            Controller.handleValidMessage(
              ExtensionCommand.SubscriptionDataForCosmos,
              {
                resourceGroups: subscriptionDatapackage.resourceGroups,
                locations: subscriptionDatapackage.locations
              }
            );
          })
          .catch((error: Error) => {
            throw error; //to log in telemetry
          });
      }
    );
  }

  public static sendFunctionsSubscriptionDataToClient(message: any) {
    Controller.Telemetry.callWithTelemetryAndCatchHandleErrors(
      TelemetryEventName.SubscriptionData,
      async function(this: IActionContext): Promise<void> {
        await AzureServices.getSubscriptionData(
          message.subscription,
          AzureResourceType.Functions
        )
          .then(subscriptionDatapackage => {
            Controller.handleValidMessage(
              ExtensionCommand.SubscriptionDataForFunctions,
              {
                resourceGroups: subscriptionDatapackage.resourceGroups,
                locations: subscriptionDatapackage.locations
              }
            );
          })
          .catch((error: Error) => {
            throw error; //to log in telemetry
          });
      }
    );
  }
  public static sendCosmosNameValidationStatusToClient(message: any) {
    AzureServices.validateCosmosAccountName(message.appName, message.subscription)
      .then(() => {
        Controller.handleValidMessage(ExtensionCommand.NameCosmos, {
          isAvailable: true
        });
      })
      .catch((error: Error) => {
        Controller.handleErrorMessage(ExtensionCommand.NameCosmos, error, {
          isAvailable: false
        });
      });
  }
  public static sendFunctionNameValidationStatusToClient(message: any) {
    AzureServices.validateFunctionAppName(message.appName, message.subscription)
      .then(() => {
        Controller.handleValidMessage(ExtensionCommand.NameFunctions, {
          isAvailable: true
        });
      })
      .catch((error: Error) => {
        Controller.handleErrorMessage(ExtensionCommand.NameFunctions, error, {
          isAvailable: false
        });
      });
  }


  // tslint:disable-next-line: max-func-body-length
  public static async handleGeneratePayloadFromClient(
    message: any
  ): Promise<any> {
    Controller.Telemetry.trackWizardTotalSessionTimeToGenerate();
    var payload = message.payload;
    var enginePayload: any = payload.engine;

    var projectNameError = "";
    var isValidProjectName = true;
    var projectPathError = "";
    var isValidProjectPath = true;

    try {
      Validator.isValidProjectName(enginePayload.projectName);
    } catch (error) {
      projectNameError = error.message;
      isValidProjectName = false;
    }

    try {
      Validator.isValidProjectPath(
        enginePayload.path,
        enginePayload.projectName
      );
    } catch (error) {
      projectPathError = error.message;
      isValidProjectPath = false;
    }

    if (!(isValidProjectName && isValidProjectPath)) {
      // Send error to wizard, do not do anything
      Controller.reactPanelContext.postMessageWebview({
        command: ExtensionCommand.ProjectPathAndNameValidation,
        payload: {
          validation: {
            isValidProjectName: isValidProjectName,
            projectNameError: projectNameError,
            isValidProjectPath: isValidProjectPath,
            projectPathError: projectPathError
          }
        }
      });
      return;
    }
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
              ).then( //log in telemetry how long it took replacement
                (cosmosReplaceResponse) => {
                  if(cosmosReplaceResponse.userReplacedEnv){
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










  

  ///////////////////////////////////////////////////////////////////////////////////////





  public static sendFunctionRuntimes(message: any) {
    Controller.handleValidMessage(ExtensionCommand.GetFunctionsRuntimes, {
      runtimes: GetAvailableRuntimes()
    });
  }

  public static sendCosmosAPIs(message: any) {
    Controller.handleValidMessage(ExtensionCommand.GetCosmosAPIs, {
      APIs: GetAvailableAPIs()
    });
  }

  private static getProgressObject(didSucceed: boolean) {
    return {
      success: didSucceed,
      failure: !didSucceed
    };
  }
}
