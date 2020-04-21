import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import {
  ExtensionCommand,
  TelemetryEventName,
  CONSTANTS,
  AzureResourceType,
  DialogMessages,
  DialogResponses,
} from "../constants";
import { IActionContext, ITelemetryService } from "../telemetry/telemetryService";
import { AzureServices } from "../azure/azureServices";
import { CoreTemplateStudio } from "../coreTemplateStudio";
import { ResourceGroupSelection } from "../azure/azure-resource-group/resourceGroupModule";
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

    const generateProjectResult = await this.generateProject(generationData, generationStatus);

    if (generateProjectResult) {
      generationData.path = generateProjectResult.generationPath;

      if (this.hasAzureServices(payload)) {
        await this.generateResourceGroups(payload, generationStatus);
        const generateAzureServicesResult = await this.generateAzureServices(payload, generationStatus);

        //if have deployed appservice and cosmos, update connectionString in appservice
        const cosmosResult = generateAzureServicesResult.find((s) => s.serviceType === AzureResourceType.Cosmos);
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

  private async generateProject(
    generationData: IGenerationPayloadType,
    generationStatus: GenerationStatus
  ): Promise<any> {
    try {
      const cli = CoreTemplateStudio.GetExistingInstance();
      const result = await cli.generate({
        payload: generationData,
        liveMessageHandler: generationStatus.updateGenerationStatusMessage,
      });

      generationStatus.setTemplatesStatus(result !== undefined);
      generationStatus.sendToClientGenerationPath(result.generationPath);
      return result;
    } catch (error) {
      Logger.appendLog("EXTENSION", "error", `Error on generation project: ${error}`);
      generationStatus.setTemplatesStatus(false);
      return;
    }
  }

  private async generateResourceGroups(payload: any, generationStatus: GenerationStatus): Promise<void> {
    const defaultResourceGroupName = await AzureServices.generateValidResourceGroupName(payload);

    if (payload.appService && payload.appService.resourceGroup === "") {
      payload.appService.resourceGroup = defaultResourceGroupName;
    }

    if (payload.cosmos && payload.cosmos.resourceGroup === "") {
      payload.cosmos.resourceGroup = defaultResourceGroupName;
    }

    const resourceGroupsToGenerate = await AzureServices.getResourceGroupSelections(payload);

    const resourceGroupQueue: Promise<void>[] = [];
    resourceGroupsToGenerate.forEach((resourceGroup) => {
      resourceGroupQueue.push(
        this.deployWithTelemetry(
          TelemetryEventName.ResourceGroupDeploy,
          this.deployResourceGroup(resourceGroup, generationStatus)
        )
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
      generationStatus.setResourceGroupStatus(true);
    } catch (error) {
      Logger.appendLog("EXTENSION", "error", `Error on Azure Resource Group creation: ${error}`);
      generationStatus.setResourceGroupStatus(false);
    }
  }

  private async generateAzureServices(
    payload: any,
    generationStatus: GenerationStatus
  ): Promise<DeployedServiceStatus[]> {
    const servicesQueue: Promise<DeployedServiceStatus>[] = [];

    if (payload.appService) {
      servicesQueue.push(
        this.deployWithTelemetry(
          TelemetryEventName.AppServiceDeploy,
          this.createAppService(payload, generationStatus))
      );
    }

    if (payload.cosmos) {
      servicesQueue.push(
        this.deployWithTelemetry(
          TelemetryEventName.CosmosDBDeploy,
          this.createCosmosDB(payload, generationStatus))
      );
    }

    const result = await Promise.all(servicesQueue);
    return result;
  }

  private async createAppService(payload: any, generationStatus: GenerationStatus): Promise<DeployedServiceStatus> {
    const result: DeployedServiceStatus = {
      serviceType: AzureResourceType.AppService,
      isDeployed: false,
    };
    try {
      await AzureServices.deployAppService(payload);
      generationStatus.setAppServiceStatus(true);
      result.isDeployed = true;
    } catch (error) {
      Logger.appendLog("EXTENSION", "error", `Error on deploy Azure App Service: ${error}`);
      generationStatus.setAppServiceStatus(false);
    }

    return result;
  }

  private async createCosmosDB(payload: any, generationStatus: GenerationStatus): Promise<DeployedServiceStatus> {
    const result: DeployedServiceStatus = {
      serviceType: AzureResourceType.Cosmos,
      isDeployed: false,
      payload: { connectionString: "" },
    };
    try {
      const connectionString = await AzureServices.deployCosmos(payload.cosmos, payload.engine.path);
      generationStatus.setCosmosStatus(true);
      result.isDeployed = true;
      result.payload.connectionString = connectionString;
      await this.replaceConnectionString(payload.engine.path, connectionString);
    } catch (error) {
      Logger.appendLog("EXTENSION", "error", `Error on deploy CosmosDB Service: ${error}`);
      generationStatus.setCosmosStatus(false);
    }

    return result;
  }

  private async replaceConnectionString(path: string, connectionString: string): Promise<void> {
    const selection = await vscode.window.showInformationMessage(
      DialogMessages.cosmosDBConnectStringReplacePrompt,
      ...[DialogResponses.yes, DialogResponses.no]
    );

    const start = Date.now();
    if (selection === DialogResponses.yes) {
      AzureServices.updateConnectionStringInEnvFile(path, connectionString);
      vscode.window.showInformationMessage(CONSTANTS.INFO.FILE_REPLACED_MESSAGE + path);
      this.trackCosmosConnectionStringReplace(start);
    }
  }

  private trackWizardTotalSessionTimeToGenerate(): void {
    this.Telemetry.trackEventWithDuration(
      TelemetryEventName.WizardSession,
      this.Telemetry.wizardSessionStartTime,
      Date.now()
    );
  }

  private trackCosmosConnectionStringReplace(startTime: number): void {
    //log in telemetry how long it took replacement
    // Temporary Disable
    this.Telemetry.trackEventWithDuration(TelemetryEventName.ConnectionStringReplace, startTime, Date.now());
  }

  private hasAzureServices(payload: any): boolean {
    //TODO: Check payload.AppService and payload.Cosmos
    return payload.appService || payload.cosmos;
  }

  //TODO: Move to telemetryService?
  private deployWithTelemetry<T>(telemetryEvent: string, callback: Promise<T>): Promise<any> {
    return this.Telemetry.callWithTelemetryAndCatchHandleErrors(telemetryEvent, async function (
      this: IActionContext
    ): Promise<T> {
      return await callback;
    });
  }
}
