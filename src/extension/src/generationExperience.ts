import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "./wizardServant";
import { ExtensionCommand, TelemetryEventName, CONSTANTS } from "./constants";
import { TelemetryAI, IActionContext } from "./telemetry/telemetryAI";
import { ReactPanel } from "./reactPanel";
import { AzureServices } from "./azure/azureServices";
import { CoreTemplateStudio } from "./coreTemplateStudio";
import { Controller } from "./controller";
import { ResourceGroupSelection } from "./azure/azure-resource-group/resourceGroupModule";

export class GenerationExperience extends WizardServant {
  private static reactPanelContext: ReactPanel;
  private static Telemetry: TelemetryAI;
  clientCommandMap: Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  > = new Map([
    [ExtensionCommand.Generate, this.handleGeneratePayloadFromClient],
    [
      ExtensionCommand.OpenProjectVSCode,
      GenerationExperience.openProjectVSCode
    ],
    [ExtensionCommand.CloseWizard, this.handleCloseWizard]
  ]);
  /**
   *
   */
  constructor(private Telemetry: TelemetryAI) {
    super();
    GenerationExperience.Telemetry = this.Telemetry;
  }

  public static setReactPanel(reactPanelContext: ReactPanel) {
    GenerationExperience.reactPanelContext = reactPanelContext;
  }

  public async handleCloseWizard() {
    Controller.reactPanelContext.dispose();
    return { payload: true };
  }

  ////TODO: MAKE GEN CALL CLIENTCOMMANDMAP FUNCTIONS VIA TO WRAP TELEMETRY AUTOMATICALLY
  // tslint:disable-next-line: max-func-body-length
  public async handleGeneratePayloadFromClient(
    message: any
  ): Promise<IPayloadResponse> {
    GenerationExperience.Telemetry.trackWizardTotalSessionTimeToGenerate();
    var payload = message.payload;
    var enginePayload: any = payload.engine;
    const apiGenResult = await this.sendTemplateGenInfoToApiAndSendStatusToClient(
      enginePayload
    ).catch(error => {
      console.log(error);
      GenerationExperience.reactPanelContext.postMessageWebview({
        command: ExtensionCommand.UpdateGenStatus,
        payload: {
          templates: GenerationExperience.getProgressObject(false),
          cosmos: GenerationExperience.getProgressObject(false),
          azureFunctions: GenerationExperience.getProgressObject(false)
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
      azureFunctions: {}
    };

    GenerationExperience.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.UpdateGenStatus,
      payload: progressObject
    });

    var serviceQueue: Promise<any>[] = [];
    let resourceGroupQueue: Promise<any>[] = [];

    if (apiGenResult) {
      enginePayload.path = apiGenResult.generationPath;
    } else {
      return { payload: undefined };
    }

    GenerationExperience.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.GetOutputPath,
      payload: { outputPath: enginePayload.path }
    });

    if (
      AzureServices.functionsSelectedNewResourceGroup(payload) ||
      AzureServices.cosmosDBSelectedNewResourceGroup(payload)
    ) {
      const distinctResourceGroupSelections: ResourceGroupSelection[] = await AzureServices.generateDistinctResourceGroupSelections(
        payload
      );
      distinctResourceGroupSelections.forEach(resourceGroupSelection => {
        resourceGroupQueue.push(
          GenerationExperience.Telemetry.callWithTelemetryAndCatchHandleErrors(
            TelemetryEventName.ResourceGroupDeploy,
            // tslint:disable-next-line: no-function-expression
            async function (this: IActionContext): Promise<void> {
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
      // Update payload if service was chosen to be deployed to a new resource group
      // Note: all resource groups created will have the same name
      if (AzureServices.functionsSelectedNewResourceGroup(payload)) {
        payload.functions.resourceGroup =
          distinctResourceGroupSelections[0].resourceGroupName;
      }
      if (AzureServices.cosmosDBSelectedNewResourceGroup(payload)) {
        payload.cosmos.resourceGroup =
          distinctResourceGroupSelections[0].resourceGroupName;
      }
    }

    // Resource groups should be created before other deploy methods execute
    Promise.all(resourceGroupQueue).then(() => {
      if (payload.selectedFunctions) {
        serviceQueue.push(
          GenerationExperience.Telemetry.callWithTelemetryAndCatchHandleErrors(
            TelemetryEventName.FunctionsDeploy,
            // tslint:disable-next-line: no-function-expression
            async function (this: IActionContext): Promise<void> {
              try {
                await AzureServices.deployFunctionApp(
                  payload.functions,
                  enginePayload.path
                );
                progressObject = {
                  ...progressObject,
                  azureFunctions: GenerationExperience.getProgressObject(true)
                };
                GenerationExperience.reactPanelContext.postMessageWebview({
                  command: ExtensionCommand.UpdateGenStatus,
                  payload: progressObject
                });
              } catch (error) {
                progressObject = {
                  ...progressObject,
                  azureFunctions: GenerationExperience.getProgressObject(false)
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
            // tslint:disable-next-line: no-function-expression
            async function (this: IActionContext): Promise<void> {
              var cosmosPayload: any = payload.cosmos;
              try {
                var dbObject = await AzureServices.deployCosmosResource(
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
                AzureServices.promptUserForCosmosReplacement(
                  enginePayload.path,
                  dbObject
                ).then(
                  //log in telemetry how long it took replacement
                  cosmosReplaceResponse => {
                    if (cosmosReplaceResponse.userReplacedEnv) {
                      // Temporary Disable
                      GenerationExperience.Telemetry.trackCustomEventTime(
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
      Promise.all(serviceQueue);
    });
    return { payload: undefined };
  }

  public async sendTemplateGenInfoToApiAndSendStatusToClient(
    enginePayload: any
  ) {
    let apiInstance = CoreTemplateStudio.GetExistingInstance();
    return await apiInstance.generate({
      payload: enginePayload,
      liveMessageHandler: this.handleGenLiveMessage
    });
  }

  private handleGenLiveMessage(message: string) {
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

  private static getProgressObject(didSucceed: boolean) {
    return {
      success: didSucceed,
      failure: !didSucceed
    };
  }
}
