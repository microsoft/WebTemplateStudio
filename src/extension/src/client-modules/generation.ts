import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import { ExtensionCommand, TelemetryEventName, CONSTANTS } from "../constants";
import { IActionContext, ITelemetryService } from "../telemetry/telemetryService";
import { ReactPanel } from "../reactPanel";
import { AzureServices } from "../azure/azureServices";
import { CoreTemplateStudio } from "../coreTemplateStudio";
import { ResourceGroupSelection } from "../azure/azure-resource-group/resourceGroupModule";
import { Settings } from "../azure/utils/settings";
import { Logger } from "../utils/logger";
import { IGenerationPayloadType } from "../types/generationPayloadType";
import { GenerationStatus } from "../utils/generationStatus";

export class Generation extends WizardServant {
  private static reactPanelContext: ReactPanel;
  private static Telemetry: ITelemetryService;
  clientCommandMap: Map<ExtensionCommand, (message: any) => Promise<IPayloadResponse>> = new Map([
    [ExtensionCommand.Generate, this.Generate],
    [ExtensionCommand.OpenProjectVSCode, Generation.openProjectVSCode],
  ]);

  constructor(private Telemetry: ITelemetryService) {
    super();
    Generation.Telemetry = this.Telemetry;
  }

  public static setReactPanel(reactPanelContext: ReactPanel): void {
    Generation.reactPanelContext = reactPanelContext;
  }

  public async Generate(message: any): Promise<IPayloadResponse> {
    Generation.trackWizardTotalSessionTimeToGenerate();

    const generationStatus = new GenerationStatus(Generation.reactPanelContext);

    const payload = message.payload;
    const enginePayload: IGenerationPayloadType = message.payload.engine;

    const apiGenResult = await this.GenerateProject(enginePayload, generationStatus);

    const serviceQueue: Promise<any>[] = [];
    let connectionString: string;

    if (apiGenResult) {
      enginePayload.path = apiGenResult.generationPath;
    } else {
      return { payload: undefined };
    }

    Generation.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.GetOutputPath,
      payload: { outputPath: enginePayload.path },
    });

    const resourceGroupsSelections = await this.generateResourceGroups(payload, generationStatus);

    if (payload.selectedAppService) {
      const appServiceResourceGroup = resourceGroupsSelections.filter(
        r => r.subscriptionItem.label === payload.appService.subscription
      );
      payload.appService.resourceGroup = appServiceResourceGroup[0].resourceGroupName;
      serviceQueue.push(
        Generation.Telemetry.callWithTelemetryAndCatchHandleErrors(TelemetryEventName.AppServiceDeploy, async function(
          this: IActionContext
        ): Promise<void> {
          try {
            const id: string = await AzureServices.deployWebApp(payload);
            generationStatus.SetAppServiceStatus(true);
            Settings.enableScmDoBuildDuringDeploy(enginePayload.path);
            Settings.setDeployDefault(id, enginePayload.path);
          } catch (error) {
            Logger.appendLog("EXTENSION", "error", `Error on deploy Azure App Service: ${error}`);
            generationStatus.SetAppServiceStatus(false);
          }
        })
      );
    }

    if (payload.selectedCosmos) {
      const cosmosResourceGroups = resourceGroupsSelections.filter(
        r => r.subscriptionItem.label === payload.cosmos.subscription
      );
      payload.cosmos.resourceGroup = cosmosResourceGroups[0].resourceGroupName;
      serviceQueue.push(
        Generation.Telemetry.callWithTelemetryAndCatchHandleErrors(TelemetryEventName.CosmosDBDeploy, async function(
          this: IActionContext
        ): Promise<void> {
          const cosmosPayload: any = payload.cosmos;
          try {
            const dbObject = await AzureServices.deployCosmosResource(cosmosPayload, enginePayload.path);
            generationStatus.SetCosmosStatus(true);
            connectionString = dbObject.connectionString;
            AzureServices.promptUserForCosmosReplacement(enginePayload.path, dbObject).then(
              //log in telemetry how long it took replacement
              cosmosReplaceResponse => {
                if (cosmosReplaceResponse.userReplacedEnv) {
                  // Temporary Disable
                  Generation.Telemetry.trackEventWithDuration(
                    TelemetryEventName.ConnectionStringReplace,
                    cosmosReplaceResponse.startTime,
                    Date.now()
                  );
                }
              }
            );
          } catch (error) {
            Logger.appendLog("EXTENSION", "error", `Error on deploy CosmosDB Service: ${error}`);
            generationStatus.SetCosmosStatus(false);
          }
        })
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

    return { payload: undefined };
  }

  private static async openProjectVSCode(message: any): Promise<IPayloadResponse> {
    vscode.commands.executeCommand(
      CONSTANTS.VSCODE_COMMAND.OPEN_FOLDER,
      vscode.Uri.file(message.payload.outputPath),
      true
    );
    return { payload: true };
  }

  private static trackWizardTotalSessionTimeToGenerate(): void {
    Generation.Telemetry.trackEventWithDuration(
      TelemetryEventName.WizardSession,
      Generation.Telemetry.wizardSessionStartTime,
      Date.now()
    );
  }

  public async GenerateProject(
    generationData: IGenerationPayloadType,
    generationStatus: GenerationStatus
  ): Promise<any> {
    try {
      const apiInstance = CoreTemplateStudio.GetExistingInstance();
      const result = await apiInstance.generate({
        payload: generationData,
        liveMessageHandler: this.SendGenerationMessageToClient,
      });

      generationStatus.SetTemplatesStatus(result !== undefined);
      return result;
    } catch (error) {
      Logger.appendLog("EXTENSION", "error", `Error on generation: ${error}`);
      generationStatus.SetTemplatesStatus(false);
      return;
    }
  }

  private SendGenerationMessageToClient(message: string): void {
    Generation.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.UpdateGenStatusMessage,
      payload: { status: message },
    });
  }

  private async generateResourceGroups(
    payload: any,
    generationStatus: GenerationStatus
  ): Promise<ResourceGroupSelection[]> {
    const resourceGroupQueue: Promise<any>[] = [];
    let resourceGroupsSelections: ResourceGroupSelection[] = [];

    if (payload.selectedCosmos || payload.selectedAppService) {
      resourceGroupsSelections = await AzureServices.getResourceGroupSelections(payload);
      resourceGroupsSelections.forEach(resourceGroupSelection => {
        resourceGroupQueue.push(
          Generation.Telemetry.callWithTelemetryAndCatchHandleErrors(
            TelemetryEventName.ResourceGroupDeploy,
            async function(this: IActionContext): Promise<void> {
              try {
                await AzureServices.deployResourceGroup(resourceGroupSelection);
                generationStatus.SetResourceGroupStatus(true);
              } catch (error) {
                Logger.appendLog("EXTENSION", "error", `Error on Azure Resource Group creation: ${error}`);
                generationStatus.SetResourceGroupStatus(false);
              }
            }
          )
        );
      });

      await Promise.all(resourceGroupQueue);
    }
    return resourceGroupsSelections;
  }
}
