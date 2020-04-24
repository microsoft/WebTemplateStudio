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
import { IGenerationPayloadType, IServicesGenerationPayload } from "../types/generationPayloadType";
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
    const generationData = message.payload as IGenerationPayloadType;

    const generateProjectResult = await this.generateProject(generationData, generationStatus);

    if (generateProjectResult) {
      generationData.path = generateProjectResult.generationPath;

      if (this.hasAzureServices(generationData.services)) {
        await this.generateResourceGroups(generationData, generationStatus);
        const generateAzureServicesResult = await this.generateAzureServices(generationData, generationStatus);

        //if have deployed appservice and cosmos, update connectionString in appservice
        const cosmosResult = generateAzureServicesResult.find((s) => s.serviceType === AzureResourceType.Cosmos);
        if (generationData.services.appService && cosmosResult && cosmosResult.payload.connectionString !== "") {
          AzureServices.updateAppSettings(
            generationData.services.appService.resourceGroup,
            generationData.services.appService.siteName,
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
      Logger.appendError("EXTENSION", "Error on generation project:", error);
      generationStatus.setTemplatesStatus(false);
      return;
    }
  }

  private async generateResourceGroups(
    generationData: IGenerationPayloadType,
    generationStatus: GenerationStatus
  ): Promise<void> {
    const { projectName, services } = generationData;
    const { appService, cosmosDB } = services;
    const defaultResourceGroupName = await AzureServices.generateValidResourceGroupName(projectName, services);

    if (appService && appService.resourceGroup === "") {
      appService.resourceGroup = defaultResourceGroupName;
    }

    if (cosmosDB && cosmosDB.resourceGroup === "") {
      cosmosDB.resourceGroup = defaultResourceGroupName;
    }

    const resourceGroupsToGenerate = await AzureServices.getResourceGroupSelections(services);

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
      Logger.appendError("EXTENSION", "Error on Azure Resource Group creation:", error);
      generationStatus.setResourceGroupStatus(false);
    }
  }

  private async generateAzureServices(
    generationData: IGenerationPayloadType,
    generationStatus: GenerationStatus
  ): Promise<DeployedServiceStatus[]> {
    const servicesQueue: Promise<DeployedServiceStatus>[] = [];

    if (generationData.services.appService) {
      servicesQueue.push(
        this.deployWithTelemetry(
          TelemetryEventName.AppServiceDeploy,
          this.createAppService(generationData, generationStatus)
        )
      );
    }

    if (generationData.services.cosmosDB) {
      servicesQueue.push(
        this.deployWithTelemetry(
          TelemetryEventName.CosmosDBDeploy,
          this.createCosmosDB(generationData, generationStatus)
        )
      );
    }

    const result = await Promise.all(servicesQueue);
    return result;
  }

  private async createAppService(
    generationData: IGenerationPayloadType,
    generationStatus: GenerationStatus
  ): Promise<DeployedServiceStatus> {
    const { services, projectName, backendFrameworkLinuxVersion, path } = generationData;
    const result: DeployedServiceStatus = {
      serviceType: AzureResourceType.AppService,
      isDeployed: false,
    };
    if (services.appService) {
      try {
        await AzureServices.deployAppService(services.appService, projectName, backendFrameworkLinuxVersion, path);
        generationStatus.setAppServiceStatus(true);
        result.isDeployed = true;
      } catch (error) {
        Logger.appendError("EXTENSION", "Error on deploy Azure App Service:", error);
        generationStatus.setAppServiceStatus(false);
      }
    }
    return result;
  }

  private async createCosmosDB(
    generationData: IGenerationPayloadType,
    generationStatus: GenerationStatus
  ): Promise<DeployedServiceStatus> {
    const { services, path } = generationData;
    const result: DeployedServiceStatus = {
      serviceType: AzureResourceType.Cosmos,
      isDeployed: false,
      payload: { connectionString: "" },
    };
    if (services.cosmosDB) {
      try {
        const connectionString = await AzureServices.deployCosmos(services.cosmosDB, path);
        generationStatus.setCosmosStatus(true);
        result.isDeployed = true;
        result.payload.connectionString = connectionString;
        await this.replaceConnectionString(path, connectionString);
      } catch (error) {
        Logger.appendError("EXTENSION", "Error on deploy CosmosDB Service:", error);
        generationStatus.setCosmosStatus(false);
      }
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

  private hasAzureServices(services: IServicesGenerationPayload): boolean {
    return services.appService !== null || services.cosmosDB !== null;
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
