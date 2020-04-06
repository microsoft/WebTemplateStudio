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
    [ExtensionCommand.Generate, this.generate],
    [ExtensionCommand.OpenProjectVSCode, this.openProjectVSCode],
  ]);

  constructor(private Telemetry: ITelemetryService) {
    super();
    Generation.Telemetry = this.Telemetry;
  }

  public setReactPanel(reactPanelContext: ReactPanel): void {
    Generation.reactPanelContext = reactPanelContext;
  }

  private async generate(message: any): Promise<IPayloadResponse> {
    this.trackWizardTotalSessionTimeToGenerate();
    const generationStatus = new GenerationStatus(Generation.reactPanelContext);
    const payload = message.payload;
    const enginePayload: IGenerationPayloadType = message.payload.engine;

    const apiGenResult = await this.GenerateProject(enginePayload, generationStatus);

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

    if(this.hasAzureServices(payload)) {
      const resourceGroups = await AzureServices.getResourceGroupSelections(payload);
      await this.generateResourceGroups(resourceGroups, generationStatus);
      const result = await this.createAzureServices(payload, resourceGroups,generationStatus);

      //POR AQUÍ VAMOS
      //HAY QUE INTENTAR SACAR EL CONNECTION STRING, PERO HOY ESTÁ ROTO COSMOS
      connectionString = result.connectionString;
      if (payload.selectedAppService && connectionString) {
        AzureServices.updateAppSettings(
          payload.appService.resourceGroup,
          payload.appService.siteName,
          connectionString
        );
      }
    }

    return { payload: undefined };
  }

  private async openProjectVSCode(message: any): Promise<IPayloadResponse> {
    vscode.commands.executeCommand(
      CONSTANTS.VSCODE_COMMAND.OPEN_FOLDER,
      vscode.Uri.file(message.payload.outputPath),
      true
    );
    return { payload: true };
  }

  private async GenerateProject(
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

  private async generateResourceGroups(resourceGroups: ResourceGroupSelection[], generationStatus: GenerationStatus): Promise<void> {    
    const resourceGroupQueue: Promise<void>[] = [];    
    resourceGroups.forEach(resourceGroup => {
      const deployResourceGroupPromise = this.deployResourceGroup(resourceGroup, generationStatus);
        resourceGroupQueue.push(
          Generation.Telemetry.callWithTelemetryAndCatchHandleErrors(
            TelemetryEventName.ResourceGroupDeploy,
            async function(this: IActionContext): Promise<void> {
              await deployResourceGroupPromise
            }
          )
        );
      });

      await Promise.all(resourceGroupQueue);
  }

  private async deployResourceGroup(resourceGroup: ResourceGroupSelection, generationStatus: GenerationStatus): Promise<void> {
    try {
      await AzureServices.deployResourceGroup(resourceGroup);
      generationStatus.SetResourceGroupStatus(true);
    } catch (error) {
      Logger.appendLog("EXTENSION", "error", `Error on Azure Resource Group creation: ${error}`);
      generationStatus.SetResourceGroupStatus(false);
    }
  }

  private async createAzureServices(payload: any, resourceGroups: ResourceGroupSelection[], generationStatus: GenerationStatus): Promise<any> {

    const servicesQueue: Promise<any>[] = [];

    if (payload.selectedAppService) {
      const createAppServicePromise = this.createAppService(payload, resourceGroups, generationStatus);
      servicesQueue.push(
        Generation.Telemetry.callWithTelemetryAndCatchHandleErrors(TelemetryEventName.AppServiceDeploy, async function(
          this: IActionContext
        ): Promise<boolean> {
          return await createAppServicePromise
        })
      );
    }

    if (payload.selectedCosmos) {
      const createCosmosDBPromise = this.createCosmosDB(payload, resourceGroups, generationStatus);
      servicesQueue.push(
        Generation.Telemetry.callWithTelemetryAndCatchHandleErrors(TelemetryEventName.CosmosDBDeploy, async function(
          this: IActionContext
        ): Promise<string> {
          return await createCosmosDBPromise
        })
      );
    }

    const result = await Promise.all(servicesQueue);
    return result;
  }

  private async createAppService(payload: any, resourceGroups: ResourceGroupSelection[], generationStatus: GenerationStatus): Promise<boolean> {
    try {
      const appServiceResourceGroup = resourceGroups.filter(r => r.subscriptionItem.label === payload.appService.subscription);
      payload.appService.resourceGroup = appServiceResourceGroup[0].resourceGroupName;
      const id: string = await AzureServices.deployWebApp(payload);
      generationStatus.SetAppServiceStatus(true);
      Settings.enableScmDoBuildDuringDeploy(payload.engine.path);
      Settings.setDeployDefault(id, payload.engine.path);
      return true;
    } catch (error) {
      Logger.appendLog("EXTENSION", "error", `Error on deploy Azure App Service: ${error}`);
      generationStatus.SetAppServiceStatus(false);
      return false;
    }
  }

  private async createCosmosDB(payload: any, resourceGroups: ResourceGroupSelection[], generationStatus: GenerationStatus): Promise<string> {
    
    const cosmosResourceGroups = resourceGroups.filter(r => r.subscriptionItem.label === payload.cosmos.subscription);
    payload.cosmos.resourceGroup = cosmosResourceGroups[0].resourceGroupName;
    const cosmosPayload = payload.cosmos;
    let connectionString = "";

    try {
      const dbObject = await AzureServices.deployCosmosResource(cosmosPayload, payload.engine.path);
      generationStatus.SetCosmosStatus(true);
      connectionString = dbObject.connectionString;
      const cosmosReplaceResponse = await AzureServices.promptUserForCosmosReplacement(payload.engine.path, dbObject);

      //log in telemetry how long it took replacement
      if (cosmosReplaceResponse.userReplacedEnv) {
        // Temporary Disable
        Generation.Telemetry.trackEventWithDuration(
          TelemetryEventName.ConnectionStringReplace,
          cosmosReplaceResponse.startTime,
          Date.now()
        );
      }
    } catch (error) {
      Logger.appendLog("EXTENSION", "error", `Error on deploy CosmosDB Service: ${error}`);
      generationStatus.SetCosmosStatus(false);
    }

    return connectionString;
  }

  private trackWizardTotalSessionTimeToGenerate(): void {
    Generation.Telemetry.trackEventWithDuration(
      TelemetryEventName.WizardSession,
      Generation.Telemetry.wizardSessionStartTime,
      Date.now()
    );
  }

  private SendGenerationMessageToClient(message: string): void {
    Generation.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.UpdateGenStatusMessage,
      payload: { status: message },
    });
  }

  private hasAzureServices(payload: any): boolean {
    //TODO: Check payload.AppService and payload.Cosmos
    return payload.selectedCosmos || payload.selectedAppService;
  }
}
