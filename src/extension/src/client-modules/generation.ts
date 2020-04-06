import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import { ExtensionCommand, TelemetryEventName, CONSTANTS, AzureResourceType } from "../constants";
import { IActionContext, ITelemetryService } from "../telemetry/telemetryService";
import { AzureServices } from "../azure/azureServices";
import { CoreTemplateStudio } from "../coreTemplateStudio";
import { ResourceGroupSelection } from "../azure/azure-resource-group/resourceGroupModule";
import { Settings } from "../azure/utils/settings";
import { Logger } from "../utils/logger";
import { IGenerationPayloadType } from "../types/generationPayloadType";
import { GenerationStatus } from "../utils/generationStatus";

interface DeployedServiceStatus {
  serviceType: AzureResourceType;
  isDeployed: boolean;
  payload?: any;
}

export class Generation extends WizardServant {
  clientCommandMap: Map<ExtensionCommand, (message: any) => Promise<IPayloadResponse>> = new Map([
    [ExtensionCommand.Generate, this.generate],
    [ExtensionCommand.OpenProjectVSCode, this.openProjectVSCode],
  ]);

  constructor(private Telemetry: ITelemetryService) {
    super();
  }

  private async generate(message: any): Promise<IPayloadResponse> {
    this.trackWizardTotalSessionTimeToGenerate();
    const generationStatus = new GenerationStatus();
    const payload = message.payload;
    const generationData = payload.engine as IGenerationPayloadType;

    const apiGenResult = await this.GenerateProject(generationData, generationStatus);

    if (apiGenResult) {
      generationData.path = apiGenResult.generationPath;

      if (this.hasAzureServices(payload)) {
        const resourceGroups = await AzureServices.getResourceGroupSelections(payload);
        await this.generateResourceGroups(resourceGroups, generationStatus);
        const result = await this.createAzureServices(payload, resourceGroups, generationStatus);

        const cosmosResult = result.find(s => s.serviceType === AzureResourceType.Cosmos);
        if (payload.selectedAppService && cosmosResult && cosmosResult.payload.connectionString !== "") {
          AzureServices.updateAppSettings(
            payload.appService.resourceGroup,
            payload.appService.siteName,
            cosmosResult.payload.connectionString
          );
        }
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
      const cli = CoreTemplateStudio.GetExistingInstance();
      const result = await cli.generate({
        payload: generationData,
        liveMessageHandler: generationStatus.UpdateGenerationStatusMessage,
      });

      generationStatus.SetTemplatesStatus(result !== undefined);
      generationStatus.SendToClientGenerationPath(result.generationPath);
      return result;
    } catch (error) {
      Logger.appendLog("EXTENSION", "error", `Error on generation: ${error}`);
      generationStatus.SetTemplatesStatus(false);
      return;
    }
  }

  private async generateResourceGroups(
    resourceGroups: ResourceGroupSelection[],
    generationStatus: GenerationStatus
  ): Promise<void> {
    const resourceGroupQueue: Promise<void>[] = [];
    resourceGroups.forEach((resourceGroup) => {
      const deployResourceGroupPromise = this.deployResourceGroup(resourceGroup, generationStatus);
      resourceGroupQueue.push(
        this.Telemetry.callWithTelemetryAndCatchHandleErrors(TelemetryEventName.ResourceGroupDeploy, async function (
          this: IActionContext
        ): Promise<void> {
          await deployResourceGroupPromise;
        })
      );
    });

    await Promise.all(resourceGroupQueue);
  }

  private async deployResourceGroup(
    resourceGroup: ResourceGroupSelection,
    generationStatus: GenerationStatus
  ): Promise<void> {
    try {
      await AzureServices.deployResourceGroup(resourceGroup);
      generationStatus.SetResourceGroupStatus(true);
    } catch (error) {
      Logger.appendLog("EXTENSION", "error", `Error on Azure Resource Group creation: ${error}`);
      generationStatus.SetResourceGroupStatus(false);
    }
  }

  private async createAzureServices(
    payload: any,
    resourceGroups: ResourceGroupSelection[],
    generationStatus: GenerationStatus
  ): Promise<DeployedServiceStatus[]> {
    const servicesQueue: Promise<DeployedServiceStatus>[] = [];

    if (payload.selectedAppService) {
      const createAppServicePromise = this.createAppService(payload, resourceGroups, generationStatus);
      servicesQueue.push(
        this.Telemetry.callWithTelemetryAndCatchHandleErrors(TelemetryEventName.AppServiceDeploy, async function (
          this: IActionContext
        ): Promise<any> {
          return await createAppServicePromise;
        })
      );
    }

    if (payload.selectedCosmos) {
      const createCosmosDBPromise = this.createCosmosDB(payload, resourceGroups, generationStatus);
      servicesQueue.push(
        this.Telemetry.callWithTelemetryAndCatchHandleErrors(TelemetryEventName.CosmosDBDeploy, async function (
          this: IActionContext
        ): Promise<any> {
          return await createCosmosDBPromise;
        })
      );
    }

    const result = await Promise.all(servicesQueue);
    return result;
  }

  private async createAppService(
    payload: any,
    resourceGroups: ResourceGroupSelection[],
    generationStatus: GenerationStatus
  ): Promise<DeployedServiceStatus> {
    const result: DeployedServiceStatus = {
      serviceType: AzureResourceType.AppService,
      isDeployed: false,
    };
    try {
      const appServiceResourceGroup = resourceGroups.filter(
        (r) => r.subscriptionItem.label === payload.appService.subscription
      );
      payload.appService.resourceGroup = appServiceResourceGroup[0].resourceGroupName;
      const id: string = await AzureServices.deployWebApp(payload);
      generationStatus.SetAppServiceStatus(true);
      Settings.enableScmDoBuildDuringDeploy(payload.engine.path);
      Settings.setDeployDefault(id, payload.engine.path);
      result.isDeployed = true;
    } catch (error) {
      Logger.appendLog("EXTENSION", "error", `Error on deploy Azure App Service: ${error}`);
      generationStatus.SetAppServiceStatus(false);
    }

    return result;
  }

  private async createCosmosDB(
    payload: any,
    resourceGroups: ResourceGroupSelection[],
    generationStatus: GenerationStatus
  ): Promise<DeployedServiceStatus> {
    const result: DeployedServiceStatus = {
      serviceType: AzureResourceType.Cosmos,
      isDeployed: false,
      payload: { connectionString: "" },
    };
    const cosmosResourceGroups = resourceGroups.filter((r) => r.subscriptionItem.label === payload.cosmos.subscription);
    payload.cosmos.resourceGroup = cosmosResourceGroups[0].resourceGroupName;
    const cosmosPayload = payload.cosmos;

    try {
      const dbObject = await AzureServices.deployCosmosResource(cosmosPayload, payload.engine.path);
      generationStatus.SetCosmosStatus(true);
      result.isDeployed = true;
      result.payload.connectionString = dbObject.connectionString;

      const cosmosReplaceResponse = await AzureServices.promptUserForCosmosReplacement(payload.engine.path, dbObject);

      //log in telemetry how long it took replacement
      if (cosmosReplaceResponse.userReplacedEnv) {
        // Temporary Disable
        this.Telemetry.trackEventWithDuration(
          TelemetryEventName.ConnectionStringReplace,
          cosmosReplaceResponse.startTime,
          Date.now()
        );
      }
    } catch (error) {
      Logger.appendLog("EXTENSION", "error", `Error on deploy CosmosDB Service: ${error}`);
      generationStatus.SetCosmosStatus(false);
    }

    return result;
  }

  private trackWizardTotalSessionTimeToGenerate(): void {
    this.Telemetry.trackEventWithDuration(
      TelemetryEventName.WizardSession,
      this.Telemetry.wizardSessionStartTime,
      Date.now()
    );
  }

  private hasAzureServices(payload: any): boolean {
    //TODO: Check payload.AppService and payload.Cosmos
    return payload.selectedCosmos || payload.selectedAppService;
  }
}
