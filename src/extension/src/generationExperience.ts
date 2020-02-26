import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "./wizardServant";
import { ExtensionCommand, TelemetryEventName, CONSTANTS } from "./constants";
import { IActionContext, ITelemetryService } from "./telemetry/telemetryService";
import { ReactPanel } from "./reactPanel";
import { AzureServices } from "./azure/azureServices";
import { CoreTemplateStudio } from "./coreTemplateStudio";
import { ResourceGroupSelection } from "./azure/azure-resource-group/resourceGroupModule";
import { Settings } from "./azure/utils/settings";
import { Logger } from "./utils/logger";

export class GenerationExperience extends WizardServant {
  private static reactPanelContext: ReactPanel;
  private static Telemetry: ITelemetryService;
  clientCommandMap: Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  > = new Map([
    [ExtensionCommand.Generate, this.handleGeneratePayloadFromClient],
    [
      ExtensionCommand.OpenProjectVSCode,
      GenerationExperience.openProjectVSCode
    ]
  ]);
  /**
   *
   */
  constructor(private Telemetry: ITelemetryService) {
    super();
    GenerationExperience.Telemetry = this.Telemetry;
  }

  public static setReactPanel(reactPanelContext: ReactPanel): void {
    GenerationExperience.reactPanelContext = reactPanelContext;
  }

  ////TODO: MAKE GEN CALL CLIENTCOMMANDMAP FUNCTIONS VIA TO WRAP TELEMETRY AUTOMATICALLY
  public async handleGeneratePayloadFromClient(
    message: any
  ): Promise<IPayloadResponse> {
    GenerationExperience.trackWizardTotalSessionTimeToGenerate();
    const payload = message.payload;
    const enginePayload: any = payload.engine;
    const apiGenResult = await this.sendTemplateGenInfoToApiAndSendStatusToClient(
      enginePayload
    ).catch(error => {
      Logger.appendLog("EXTENSION", "error", `Error on generation: ${error}`);
      GenerationExperience.reactPanelContext.postMessageWebview({
        command: ExtensionCommand.UpdateGenStatus,
        payload: {
          templates: GenerationExperience.getProgressObject(false),
          cosmos: GenerationExperience.getProgressObject(false)
        }
      });
      return;
    });

    let progressObject = {
      templates: GenerationExperience.getProgressObject(
        apiGenResult !== undefined
      ),
      resourceGroup: {},
      cosmos: {},
      appService: {}
    };
    let connectionString: string;

    GenerationExperience.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.UpdateGenStatus,
      payload: progressObject
    });

    const serviceQueue: Promise<any>[] = [];
    const resourceGroupQueue: Promise<any>[] = [];

    if (apiGenResult) {
      enginePayload.path = apiGenResult.generationPath;
    } else {
      return { payload: undefined };
    }

    GenerationExperience.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.GetOutputPath,
      payload: { outputPath: enginePayload.path }
    });

    if (payload.selectedCosmos || payload.selectedAppService) {
      const distinctResourceGroupSelections: ResourceGroupSelection[] = await AzureServices.generateDistinctResourceGroupSelections(
        payload
      );
      distinctResourceGroupSelections.forEach(resourceGroupSelection => {
        resourceGroupQueue.push(
          GenerationExperience.Telemetry.callWithTelemetryAndCatchHandleErrors(
            TelemetryEventName.ResourceGroupDeploy,
            async function(this: IActionContext): Promise<void> {
              try {
                await AzureServices.deployResourceGroup(resourceGroupSelection);
                progressObject = {
                  ...progressObject,
                  resourceGroup: GenerationExperience.getProgressObject(true)
                };
                GenerationExperience.reactPanelContext.postMessageWebview({
                  command: ExtensionCommand.UpdateGenStatus,
                  payload: progressObject
                });
              } catch (error) {                
                Logger.appendLog("EXTENSION", "error", `Error on Azure Resource Group creation: ${error}`);
                progressObject = {
                  ...progressObject,
                  resourceGroup: GenerationExperience.getProgressObject(false)
                };
                GenerationExperience.reactPanelContext.postMessageWebview({
                  command: ExtensionCommand.UpdateGenStatus,
                  payload: progressObject
                });
              }
            }
          )
        );
      });
      // Add the new resouce group name to payload
      if (payload.selectedCosmos) {
        const cosmosResourceGroups = distinctResourceGroupSelections.filter(
          r => r.subscriptionItem.label === payload.cosmos.subscription
        );
        payload.cosmos.resourceGroup =
          cosmosResourceGroups[0].resourceGroupName;
      }
      if (payload.selectedAppService) {
        const appServiceResourceGroup = distinctResourceGroupSelections.filter(
          r => r.subscriptionItem.label === payload.appService.subscription
        );
        payload.appService.resourceGroup =
          appServiceResourceGroup[0].resourceGroupName;
      }
    }

    // Resource groups should be created before other deploy methods execute
    Promise.all(resourceGroupQueue).then(() => {
      if (payload.selectedAppService) {
        serviceQueue.push(
          GenerationExperience.Telemetry.callWithTelemetryAndCatchHandleErrors(
            TelemetryEventName.AppServiceDeploy,
            async function(this: IActionContext): Promise<void> {
              try {
                const id: string = await AzureServices.deployWebApp(payload);
                progressObject = {
                  ...progressObject,
                  appService: GenerationExperience.getProgressObject(true)
                };
                GenerationExperience.reactPanelContext.postMessageWebview({
                  command: ExtensionCommand.UpdateGenStatus,
                  payload: progressObject
                });
                Settings.enableScmDoBuildDuringDeploy(enginePayload.path);
                Settings.setDeployDefault(id, enginePayload.path);
              } catch (error) {                
                Logger.appendLog("EXTENSION", "error", `Error on deploy Azure App Service: ${error}`);
                progressObject = {
                  ...progressObject,
                  appService: GenerationExperience.getProgressObject(false)
                };
                GenerationExperience.reactPanelContext.postMessageWebview({
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
          GenerationExperience.Telemetry.callWithTelemetryAndCatchHandleErrors(
            TelemetryEventName.CosmosDBDeploy,
            async function(this: IActionContext): Promise<void> {
              const cosmosPayload: any = payload.cosmos;
              try {
                const dbObject = await AzureServices.deployCosmosResource(
                  cosmosPayload,
                  enginePayload.path
                );
                progressObject = {
                  ...progressObject,
                  cosmos: GenerationExperience.getProgressObject(true)
                };
                GenerationExperience.reactPanelContext.postMessageWebview({
                  command: ExtensionCommand.UpdateGenStatus,
                  payload: progressObject
                });
                connectionString = dbObject.connectionString;
                AzureServices.promptUserForCosmosReplacement(
                  enginePayload.path,
                  dbObject
                ).then(
                  //log in telemetry how long it took replacement
                  cosmosReplaceResponse => {
                    if (cosmosReplaceResponse.userReplacedEnv) {
                      // Temporary Disable
                      GenerationExperience.Telemetry.trackEventWithDuration(
                        TelemetryEventName.ConnectionStringReplace,
                        cosmosReplaceResponse.startTime,
                        Date.now()
                      );
                    }
                  }
                );
              } catch (error) {                
                Logger.appendLog("EXTENSION", "error", `Error on deploy CosmosDB Service: ${error}`);
                progressObject = {
                  ...progressObject,
                  cosmos: GenerationExperience.getProgressObject(false)
                };
                GenerationExperience.reactPanelContext.postMessageWebview({
                  command: ExtensionCommand.UpdateGenStatus,
                  payload: progressObject
                });
              }
            }
          )
        );
      }

      // kick off both services asynchronously
      Promise.all(serviceQueue).then(() => {
        if (payload.selectedAppService && connectionString) {
          AzureServices.updateAppSettings(
            payload.appService.resourceGroup,
            payload.appService.siteName,
            connectionString
          );
        }
      });
    });
    return { payload: undefined };
  }

  public async sendTemplateGenInfoToApiAndSendStatusToClient(
    enginePayload: any
  ): Promise<any> {
    const apiInstance = CoreTemplateStudio.GetExistingInstance();
    return await apiInstance.generate({
      payload: enginePayload,
      liveMessageHandler: this.handleGenLiveMessage
    });
  }

  private handleGenLiveMessage(message: string): void {
    GenerationExperience.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.UpdateGenStatusMessage,
      payload: {
        status: message
      }
    });
  }

  private static async openProjectVSCode(
    message: any
  ): Promise<IPayloadResponse> {
    vscode.commands.executeCommand(
      CONSTANTS.VSCODE_COMMAND.OPEN_FOLDER,
      vscode.Uri.file(message.payload.outputPath),
      true
    );
    return { payload: true };
  }

  private static getProgressObject(didSucceed: boolean): any {
    return {
      success: didSucceed,
      failure: !didSucceed
    };
  }  

  private static trackWizardTotalSessionTimeToGenerate(): void {
    GenerationExperience.Telemetry.trackEventWithDuration(
      TelemetryEventName.WizardSession,
      GenerationExperience.Telemetry.wizardSessionStartTime,
      Date.now()
    );
  }
}
