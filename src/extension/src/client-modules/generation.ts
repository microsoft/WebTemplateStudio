import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import {
  TelemetryEventName,
  CONSTANTS,
  AzureResourceType
} from "../constants/constants";
import { DialogMessages, DialogResponses} from "../constants/dialog";
import { IActionContext, ITelemetryService } from "../telemetry/telemetryService";
import { AzureServices } from "../azure/azureServices";
import { CoreTemplateStudio } from "../coreTemplateStudio";
import { ResourceGroupSelection } from "../azure/azure-resource-group/resourceGroupModule";
import { Logger } from "../utils/logger";
import { IGenerationPayloadType, IServicesGenerationPayload } from "../types/generationPayloadType";
import { sendToClientGenerationStatus, GenerationItemStatus, updateStatusMessage, sendToClientGenerationPath, GENERATION_NAMES } from "../utils/generationStatus";
import { MESSAGES } from "../constants/messages";
import { ExtensionCommand } from "../constants/extension";

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
    const generationData = message.payload as IGenerationPayloadType;

    const generationPath = await this.generateProject(generationData);

    if (generationPath) {
      sendToClientGenerationPath(generationPath);
      generationData.path = generationPath;

      if (this.hasAzureServices(generationData.services)) {
        await this.generateResourceGroups(generationData);
        await this.generateAzureServices(generationData);
      }
    } else if (this.hasAzureServices(generationData.services)) {
      sendToClientGenerationStatus(GENERATION_NAMES.APP_SERVICE, GenerationItemStatus.Failed, "ERROR: Azure Service deployment halted due to template error.");
      sendToClientGenerationStatus(GENERATION_NAMES.COSMOS_DB, GenerationItemStatus.Failed, "ERROR: Azure Service deployment halted due to template error.");
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

  private async generateProject(generationData: IGenerationPayloadType): Promise<string|undefined> {
    try {
      sendToClientGenerationStatus(GENERATION_NAMES.TEMPLATES, GenerationItemStatus.Generating);
      const cli = CoreTemplateStudio.GetExistingInstance();
      const result = await cli.generate({payload: generationData,liveMessageHandler: updateStatusMessage});
      sendToClientGenerationStatus(GENERATION_NAMES.TEMPLATES, GenerationItemStatus.Success, "The project generation has finished successfully");      
      return result.generationPath;
    } catch (error) {
      Logger.appendError("EXTENSION", "Error on generation project:", error);      
      sendToClientGenerationStatus(GENERATION_NAMES.TEMPLATES, GenerationItemStatus.Failed, `ERROR: Templates could not be generated`);
      return;
    }
  }

  private async generateResourceGroups(
    generationData: IGenerationPayloadType
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
          this.deployResourceGroup(resourceGroup)
        )
      );
    });

    await Promise.all(resourceGroupQueue);
  }

  private async deployResourceGroup(
    resourceGroup: ResourceGroupSelection
  ): Promise<void> {
    try {
      await AzureServices.deployResourceGroup(resourceGroup);
    } catch (error) {
      Logger.appendError("EXTENSION", "Error on Azure Resource Group creation:", error);
    }
  }

  private async generateAzureServices(
    generationData: IGenerationPayloadType
  ): Promise<void> {
    const servicesQueue: Promise<DeployedServiceStatus>[] = [];

    if (generationData.services.appService) {
      servicesQueue.push(
        this.deployWithTelemetry(
          TelemetryEventName.AppServiceDeploy,
          this.createAppService(generationData)
        )
      );
    }

    if (generationData.services.cosmosDB) {
      servicesQueue.push(
        this.deployWithTelemetry(
          TelemetryEventName.CosmosDBDeploy,
          this.createCosmosDB(generationData)
        )
      );
    }

    const result = await Promise.all(servicesQueue);

    //if have deployed appservice and cosmos, update connectionString in appservice
    const cosmosResult = result.find((s) => s.serviceType === AzureResourceType.Cosmos);
    if (generationData.services.appService && cosmosResult && cosmosResult.payload.connectionString !== "") {
      AzureServices.updateAppSettings(
        generationData.services.appService.resourceGroup,
        generationData.services.appService.siteName,
        cosmosResult.payload.connectionString
      );
    }
  }

  private async createAppService(
    generationData: IGenerationPayloadType
  ): Promise<DeployedServiceStatus> {
    const { services, projectName, backendFrameworkLinuxVersion, path } = generationData;
    const result: DeployedServiceStatus = {
      serviceType: AzureResourceType.AppService,
      isDeployed: false,
    };
    if (services.appService) {
      try {
        sendToClientGenerationStatus(GENERATION_NAMES.APP_SERVICE, GenerationItemStatus.Generating, "Deploying Azure services (this may take a few minutes).");
        await AzureServices.deployAppService(services.appService, projectName, backendFrameworkLinuxVersion, path);
        sendToClientGenerationStatus(GENERATION_NAMES.APP_SERVICE, GenerationItemStatus.Success);
        result.isDeployed = true;                
      } catch (error) {
        Logger.appendError("EXTENSION", "Error on deploy Azure App Service:", error);
        sendToClientGenerationStatus(GENERATION_NAMES.APP_SERVICE, GenerationItemStatus.Failed, "ERROR: App Service failed to deploy");
      }
    }
    return result;
  }

  private async createCosmosDB(
    generationData: IGenerationPayloadType
  ): Promise<DeployedServiceStatus> {
    const { services, path, backendFramework } = generationData;
    const result: DeployedServiceStatus = {
      serviceType: AzureResourceType.Cosmos,
      isDeployed: false,
      payload: { connectionString: "" },
    };
    if (services.cosmosDB) {
      try {
        sendToClientGenerationStatus(GENERATION_NAMES.COSMOS_DB, GenerationItemStatus.Generating, "Deploying Azure services (this may take a few minutes).");
        const connectionString = await AzureServices.deployCosmos(services.cosmosDB, path);
        sendToClientGenerationStatus(GENERATION_NAMES.COSMOS_DB, GenerationItemStatus.Success);
        result.isDeployed = true;
        result.payload.connectionString = connectionString;
        await this.replaceConnectionString(path, connectionString, backendFramework);
      } catch (error) {
        Logger.appendError("EXTENSION", "Error on deploy CosmosDB Service:", error);
        sendToClientGenerationStatus(GENERATION_NAMES.COSMOS_DB, GenerationItemStatus.Failed, "ERROR: Cosmos DB failed to deploy");
      }
    }

    return result;
  }

  private async replaceConnectionString(path: string, connectionString: string, backendFramework: string): Promise<void> {
    const selection = await vscode.window.showInformationMessage(
      DialogMessages.cosmosDBConnectStringReplacePrompt,
      ...[DialogResponses.yes, DialogResponses.no]
    );

    const start = Date.now();
    if (selection === DialogResponses.yes) {
      AzureServices.updateConnectionStringToProject(path, connectionString, backendFramework);
      vscode.window.showInformationMessage(MESSAGES.INFO.FILE_REPLACED_MESSAGE + path);
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
