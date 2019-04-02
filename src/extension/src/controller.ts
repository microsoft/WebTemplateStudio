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
  AzureAuth,
  SubscriptionItem,
  ResourceGroupItem,
  LocationItem
} from "./azure-auth/azureAuth";
import {
  SubscriptionError,
  ValidationError,
  ResourceGroupError
} from "./errors";
import {
  FunctionProvider,
  FunctionSelections,
  GetAvailableRuntimes
} from "./azure-functions/functionProvider";
import {
  CosmosDBDeploy,
  CosmosDBSelections,
  DatabaseObject,
  GetAvailableAPIs
} from "./azure-cosmosDB/cosmosDbModule";
import { ReactPanel } from "./reactPanel";
import ApiModule from "./apiModule";
import { ChildProcess } from "child_process";
import { TelemetryAI, IActionContext } from "./telemetry/telemetryAI";

export abstract class Controller {
  private static usersCosmosDBSubscriptionItemCache: SubscriptionItem;
  private static usersFunctionSubscriptionItemCache: SubscriptionItem;
  private static AzureFunctionProvider = new FunctionProvider();
  private static AzureCosmosDBProvider = new CosmosDBDeploy();
  private static reactPanelContext: ReactPanel;
  private static Telemetry: TelemetryAI;
  // This will map commands from the client to functions.

  private static clientCommandMap: Map<
    ExtensionCommand,
    (message: any) => void
  > = new Map([
    [ExtensionCommand.Login, Controller.performLogin],
    [ExtensionCommand.Subscriptions, Controller.sendSubscriptionsToClient],
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
    [ExtensionCommand.GetUserStatus, Controller.sendUserStatus],
    [ExtensionCommand.OpenProjectVSCode, Controller.openProjectVSCode]
  ]);

  private static openProjectVSCode(message: any) {
    vscode.commands.executeCommand(
      CONSTANTS.VSCODE_COMMAND.OPEN_FOLDER,
      vscode.Uri.file(message.payload.outputPath),
      true
    );
  }

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

  /**
   * Returns an array of Subscription Items when the user is logged in
   *
   * */
  public static getSubscriptions() {
    return AzureAuth.getSubscriptions();
  }

  /**
   * @param String subscription label
   * @returns a Json object of Formatted Resource and Location strings
   *
   * */
  public static async getSubscriptionData(
    subscriptionLabel: string,
    AzureType: AzureResourceType
  ) {
    let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
    let resourceGroupItems = this.getResourceGroups(subscriptionItem).then(
      resourceGroups => {
        // Format
        let formatResourceGroupList = [];
        formatResourceGroupList.push(
          ...resourceGroups.map(resourceGroup => {
            return {
              label: resourceGroup.name,
              value: resourceGroup.name
            };
          })
        );
        return formatResourceGroupList;
      }
    );

    var locationItems: LocationItem[] = [];

    switch (AzureType) {
      case AzureResourceType.Cosmos:
        locationItems = await AzureAuth.getLocationsForCosmos(subscriptionItem);
        break;
      case AzureResourceType.Functions:
        locationItems = await AzureAuth.getLocationsForFunctions(
          subscriptionItem
        );
        break;
    }

    let locations = [];
    locations.push(
      ...locationItems.map(location => {
        return {
          label: location.locationDisplayName,
          value: location.locationDisplayName
        };
      })
    );

    // Parallel setup
    return {
      resourceGroups: await resourceGroupItems,
      locations: locations
    };
  }

  /**
   * @param SubscriptionItem subscription item interface implementation
   * @returns a list of Resource Group Items
   *
   * */
  private static async getResourceGroups(subscriptionItem: SubscriptionItem) {
    return AzureAuth.getResourceGroupItems(subscriptionItem);
  }

  public static async validateFunctionAppName(
    functionAppName: string,
    subscriptionLabel: string
  ): Promise<void> {
    await this.updateFunctionSubscriptionItemCache(subscriptionLabel);

    return this.AzureFunctionProvider.checkFunctionAppName(
      functionAppName,
      this.usersFunctionSubscriptionItemCache
    )
      .then(isAvailable => {
        if (isAvailable) {
          return Promise.resolve();
        } else {
          return Promise.reject(
            new ValidationError(
              CONSTANTS.ERRORS.FUNCTION_APP_NAME_NOT_AVAILABLE(functionAppName)
            )
          );
        }
      })
      .catch(error => {
        throw error;
      });
  }

  public static performLogin(message: any) {
    Controller.Telemetry.callWithTelemetryAndCatchHandleErrors(
      TelemetryEventName.PerformLogin,
      async function(this: IActionContext): Promise<void> {
        await AzureAuth.login()
          .then(res => {
            const email = AzureAuth.getEmail();
            AzureAuth.getSubscriptions()
              .then(items => {
                const subscriptions = items.map(subscriptionItem => {
                  return {
                    label: subscriptionItem.label,
                    value: subscriptionItem.label
                  };
                });
                Controller.handleValidMessage(ExtensionCommand.Login, {
                  email: email,
                  subscriptions: subscriptions
                });
              })
              .catch((error: Error) => {
                Controller.handleErrorMessage(ExtensionCommand.Login, error);
              });
          })
          .catch(error => {
            vscode.window.showErrorMessage(error);
          });
      }
    );
  }

  public static sendSubscriptionsToClient(message: any) {
    Controller.Telemetry.callWithTelemetryAndCatchHandleErrors(
      TelemetryEventName.Subscriptions,
      async function(this: IActionContext): Promise<void> {
        await Controller.getSubscriptions()
          .then(subscriptions => {
            Controller.handleValidMessage(ExtensionCommand.Subscriptions, {
              subscriptions: subscriptions
            });
          })
          .catch((error: Error) => {
            Controller.handleErrorMessage(
              ExtensionCommand.Subscriptions,
              error
            );
          });
      }
    );
  }

  public static sendCosmosSubscriptionDataToClient(message: any) {
    Controller.Telemetry.callWithTelemetryAndCatchHandleErrors(
      TelemetryEventName.SubscriptionData,
      async function(this: IActionContext): Promise<void> {
        await Controller.getSubscriptionData(
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
            Controller.handleErrorMessage(
              ExtensionCommand.SubscriptionDataForCosmos,
              error
            );
          });
      }
    );
  }

  public static sendFunctionsSubscriptionDataToClient(message: any) {
    Controller.Telemetry.callWithTelemetryAndCatchHandleErrors(
      TelemetryEventName.SubscriptionData,
      async function(this: IActionContext): Promise<void> {
        await Controller.getSubscriptionData(
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
            Controller.handleErrorMessage(
              ExtensionCommand.SubscriptionDataForFunctions,
              error
            );
          });
      }
    );
  }

  public static sendFunctionNameValidationStatusToClient(message: any) {
    Controller.validateFunctionAppName(message.appName, message.subscription)
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

  public static sendCosmosNameValidationStatusToClient(message: any) {
    Controller.validateCosmosAccountName(message.appName, message.subscription)
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
              Controller.deployFunctionApp(
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
              var dbObject = await Controller.deployCosmosResource(
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
              Controller.promptUserForCosmosReplacement(
                enginePayload.path,
                dbObject
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

  private static async promptUserForCosmosReplacement(
    pathToEnv: string,
    dbObject: DatabaseObject
  ) {
    return await vscode.window
      .showInformationMessage(
        DialogMessages.cosmosDBConnectStringReplacePrompt,
        ...[DialogResponses.yes, DialogResponses.no]
      )
      .then((selection: vscode.MessageItem | undefined) => {
        if (selection === DialogResponses.yes) {
          var start = Date.now();
          CosmosDBDeploy.updateConnectionStringInEnvFile(
            pathToEnv,
            dbObject.connectionString
          );
          vscode.window.showInformationMessage(
            CONSTANTS.INFO.FILE_REPLACED_MESSAGE + pathToEnv
          );
          Controller.Telemetry.trackCustomEventTime(
            TelemetryEventName.ConnectionStringReplace,
            start,
            Date.now()
          );
        }
        return selection === DialogResponses.yes;
      });
  }

  public static async processFunctionDeploymentAndSendStatusToClient(
    funcPayload: any,
    genPath: string
  ) {
    /*
     * example:
     *   {
     *       appName: "YOUR_FUNCTION_APP_NAME",
     *       subscription: "YOUR_SUBSCRIPTION_LABEL",
     *       location: "West US",
     *       runtime: "node",
     *       resourceGroup: "YOUR_RESOURCE_GROUP",
     *       functionNames: ["function1", "function2", "function3"]
     *   }
     */
    await Controller.deployFunctionApp(funcPayload, genPath)
      .then(() => {
        Controller.handleValidMessage(ExtensionCommand.DeployFunctions, {
          succeeded: true
        });

        vscode.window.showInformationMessage(
          CONSTANTS.INFO.FUNCTION_APP_DEPLOYED(funcPayload.appName)
        );
      })
      .catch((error: Error) => {
        vscode.window.showErrorMessage(error.message);
        Controller.handleErrorMessage(ExtensionCommand.DeployFunctions, error, {
          succeeded: false
        });
      });
  }

  public static processCosmosDeploymentAndSendStatusToClient(
    cosmosPayload: any,
    genPath: string
  ) {
    /*
     * example:
     *   {
     *       api: "MongoDB",
     *       accountName: "YOUR_ACCOUNT_NAME",
     *       location: "West US",
     *       subscription: "YOUR_SUBSCRIPTION_LABEL",
     *       resourceGroup: "YOUR_RESOURCE_GROUP"
     *   }
     */
    return Controller.deployCosmosResource(cosmosPayload, genPath)
      .then((dbObject: DatabaseObject) => {
        Controller.handleValidMessage(ExtensionCommand.DeployCosmos, {
          databaseObject: dbObject
        });
        return dbObject;
      })
      .catch((error: Error) => {
        vscode.window.showErrorMessage(error.message);
        Controller.handleErrorMessage(ExtensionCommand.DeployCosmos, error);
        throw error;
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

  public static async validateCosmosAccountName(
    cosmosDBAccountName: string,
    subscriptionLabel: string
  ): Promise<void> {
    await this.updateCosmosDBSubscriptionItemCache(subscriptionLabel);

    return this.AzureCosmosDBProvider.validateCosmosDBAccountName(
      cosmosDBAccountName,
      Controller.usersCosmosDBSubscriptionItemCache
    )
      .then(message => {
        if (message === undefined || message === null || message === "") {
          return Promise.resolve();
        } else {
          return Promise.reject(new ValidationError(message));
        }
      })
      .catch(error => {
        throw error;
      });
  }

  public static async deployFunctionApp(
    selections: any,
    appPath: string
  ): Promise<void> {
    await this.updateFunctionSubscriptionItemCache(selections.subscription);

    let userFunctionsSelections: FunctionSelections = {
      functionAppName: selections.appName,
      subscriptionItem: Controller.usersFunctionSubscriptionItemCache,
      resourceGroupItem: await this._getResourceGroupItem(
        selections.resourceGroup,
        Controller.usersFunctionSubscriptionItemCache
      ),
      location: selections.location,
      runtime: selections.runtimeStack,
      functionNames: selections.functionNames
    };

    let functionProvider = new FunctionProvider();

    return await functionProvider.createFunctionApp(
      userFunctionsSelections,
      appPath
    );
  }

  public static async deployCosmosResource(
    selections: any,
    genPath: string
  ): Promise<DatabaseObject> {
    try {
      await Controller.validateCosmosAccountName(
        selections.accountName,
        selections.subscription
      );
    } catch (error) {
      return Promise.reject(error);
    }

    let userCosmosDBSelection: CosmosDBSelections = {
      cosmosAPI: selections.api,
      cosmosDBResourceName: selections.accountName,
      location: selections.location,
      resourceGroupItem: await this._getResourceGroupItem(
        selections.resourceGroup,
        Controller.usersCosmosDBSubscriptionItemCache
      ),
      subscriptionItem: Controller.usersCosmosDBSubscriptionItemCache
    };

    return await this.AzureCosmosDBProvider.createCosmosDB(
      userCosmosDBSelection,
      genPath
    );
  }

  private static async _getResourceGroupItem(
    resourceName: string,
    subscriptionItem: SubscriptionItem
  ): Promise<ResourceGroupItem> {
    return AzureAuth.getResourceGroupItems(subscriptionItem).then(items => {
      for (let resourceGroup of items) {
        if (resourceGroup.name === resourceName) {
          return resourceGroup;
        }
      }
      throw new ResourceGroupError(CONSTANTS.ERRORS.RESOURCE_GROUP_NOT_FOUND);
    });
  }

  private static async _getSubscriptionItem(
    subscriptionLabel: string
  ): Promise<SubscriptionItem> {
    return AzureAuth.getSubscriptions().then(items => {
      for (let subscriptionItem of items) {
        if (subscriptionItem.label === subscriptionLabel) {
          return subscriptionItem;
        }
      }
      throw new SubscriptionError(CONSTANTS.ERRORS.SUBSCRIPTION_NOT_FOUND);
    });
  }

  /*
   * Caching is used for performance; when displaying live check on keystroke to wizard
   */
  private static async updateCosmosDBSubscriptionItemCache(
    subscriptionLabel: string
  ): Promise<void> {
    if (
      this.usersCosmosDBSubscriptionItemCache === undefined ||
      subscriptionLabel !== this.usersCosmosDBSubscriptionItemCache.label
    ) {
      let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
      this.usersCosmosDBSubscriptionItemCache = subscriptionItem;
    }
  }

  private static async updateFunctionSubscriptionItemCache(
    subscriptionLabel: string
  ): Promise<void> {
    if (
      this.usersFunctionSubscriptionItemCache === undefined ||
      subscriptionLabel !== this.usersFunctionSubscriptionItemCache.label
    ) {
      let subscriptionItem = await this._getSubscriptionItem(subscriptionLabel);
      this.usersFunctionSubscriptionItemCache = subscriptionItem;
    }
  }

  private static async sendUserStatus(message: any): Promise<void> {
    Controller.Telemetry.callWithTelemetryAndCatchHandleErrors(
      TelemetryEventName.GetUserLoginStatus,
      async function(this: IActionContext) {
        try {
          const email = AzureAuth.getEmail();
          AzureAuth.getSubscriptions().then(items => {
            const subscriptions = items.map(subscriptionItem => {
              return {
                label: subscriptionItem.label,
                value: subscriptionItem.label
              };
            });
            Controller.handleValidMessage(ExtensionCommand.GetUserStatus, {
              email: email,
              subscriptions: subscriptions
            });
          });
        } catch (error) {
          Controller.handleValidMessage(ExtensionCommand.GetUserStatus, null);
        }
      }
    );
  }

  private static getProgressObject(didSucceed: boolean) {
    return {
      success: didSucceed,
      failure: !didSucceed
    };
  }
}
