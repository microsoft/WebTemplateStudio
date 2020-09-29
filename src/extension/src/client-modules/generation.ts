import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import {
  CONSTANTS,
  AzureResourceType
} from "../constants/constants";
import { TelemetryEventName } from '../constants/telemetry';
import { IActionContext, ITelemetryService } from "../telemetry/telemetryService";
import { AzureServices } from "../azure/azureServices";
import { CoreTemplateStudio } from "../coreTemplateStudio";
import { Logger } from "../utils/logger";
import { IAppService, ICosmosDB, IGenerationData, SERVICE_CATEGORY, SERVICE_TYPE } from "../types/generationPayloadType";
import { sendToClientGenerationStatus, GenerationItemStatus, updateStatusMessage, GENERATION_NAMES } from "../utils/generationStatus";
import { MESSAGES } from "../constants/messages";
import { EXTENSION_COMMANDS } from "../constants/commands";
import GenerationServicesService from "../utils/generation/GenerationServicesService";

interface DeployedServiceStatus {
  serviceType: AzureResourceType;
  isDeployed: boolean;
  payload?: any;
}

export class Generation extends WizardServant {
  clientCommandMap: Map<EXTENSION_COMMANDS, (message: any) => Promise<IPayloadResponse>> = new Map([
    [EXTENSION_COMMANDS.GENERATE, this.generate],
    [EXTENSION_COMMANDS.OPEN_PROJECT_IN_VSCODE, this.openProjectVSCode],
  ]);

  constructor(private Telemetry: ITelemetryService) {
    super();
  }

  private async generate(message: any): Promise<IPayloadResponse> {
    this.trackWizardTotalSessionTimeToGenerate();
    const generationData = this.getGenerationData(message.payload);
    const generationPath = await this.generateProject(generationData);

    if (generationPath) {
      generationData.path = generationPath;

      const service = new GenerationServicesService(this.Telemetry);
      const generationServicesStatus = await service.generate(generationData.services, generationData.projectName);
      console.log(generationServicesStatus);

      if (!this.hasAzureServices(generationData)) {
        await this.generateAzureServices(generationData);
      }
    } else if (this.hasAzureServices(generationData)) {
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

  private async generateProject(generationData: IGenerationData): Promise<string|undefined> {
    try {
      sendToClientGenerationStatus(GENERATION_NAMES.TEMPLATES, GenerationItemStatus.Generating);
      const cli = CoreTemplateStudio.GetExistingInstance();
      const result = await cli.generate({payload: generationData,liveMessageHandler: updateStatusMessage});
      const generationPath = result.generationPath;
      sendToClientGenerationStatus(GENERATION_NAMES.TEMPLATES, GenerationItemStatus.Success, "The project generation has finished successfully", { generationPath });
      return generationPath;
    } catch (error) {
      Logger.appendError("EXTENSION", "Error on generation project:", error);
      sendToClientGenerationStatus(GENERATION_NAMES.TEMPLATES, GenerationItemStatus.Failed, `ERROR: Templates could not be generated`);
      return;
    }
  }

  private async generateAzureServices(
    generationData: IGenerationData
  ): Promise<void> {
    const servicesQueue: Promise<DeployedServiceStatus>[] = [];

    const appService = generationData.services.find(s => s.category === SERVICE_CATEGORY.AZURE && s.type === SERVICE_TYPE.APPSERVICE) as IAppService;
    const cosmosService = generationData.services.find(s => s.category === SERVICE_CATEGORY.AZURE && s.type === SERVICE_TYPE.COSMOSDB) as ICosmosDB;

    if (appService) {
      servicesQueue.push(
        this.deployWithTelemetry(
          TelemetryEventName.AppServiceDeploy,
          this.createAppService(generationData)
        )
      );
    }

    if (cosmosService) {
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
    if (appService && cosmosResult && cosmosResult.payload.connectionString !== "") {
      AzureServices.updateAppSettings(
        appService.resourceGroup,
        appService.siteName,
        cosmosResult.payload.connectionString
      );
    }
  }

  private async createAppService(
    generationData: IGenerationData
  ): Promise<DeployedServiceStatus> {
    const { projectName, backendFrameworkLinuxVersion, path } = generationData;
    const result: DeployedServiceStatus = {
      serviceType: AzureResourceType.AppService,
      isDeployed: false,
    };
    const appService = generationData.services.find(s => s.category === SERVICE_CATEGORY.AZURE && s.type === SERVICE_TYPE.APPSERVICE) as IAppService;
    if (appService) {
      try {
        sendToClientGenerationStatus(GENERATION_NAMES.APP_SERVICE, GenerationItemStatus.Generating, "Deploying Azure services (this may take a few minutes).");
        await AzureServices.deployAppService(appService, projectName, backendFrameworkLinuxVersion, path);
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
    generationData: IGenerationData
  ): Promise<DeployedServiceStatus> {
    const { path, backendFramework } = generationData;
    const result: DeployedServiceStatus = {
      serviceType: AzureResourceType.Cosmos,
      isDeployed: false,
      payload: { connectionString: "" },
    };
    const cosmosService = generationData.services.find(s => s.category === SERVICE_CATEGORY.AZURE && s.type === SERVICE_TYPE.COSMOSDB) as ICosmosDB;
    if (cosmosService) {
      try {
        sendToClientGenerationStatus(GENERATION_NAMES.COSMOS_DB, GenerationItemStatus.Generating, "Deploying Azure services (this may take a few minutes).");
        const connectionString = await AzureServices.deployCosmos(cosmosService, path);
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
      MESSAGES.DIALOG_MESSAGES.cosmosDBConnectStringReplacePrompt,
      ...[MESSAGES.DIALOG_RESPONSES.yes, MESSAGES.DIALOG_RESPONSES.no]
    );

    const start = Date.now();
    if (selection === MESSAGES.DIALOG_RESPONSES.yes) {
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

  private hasAzureServices(generationData: IGenerationData): boolean {
    return generationData.services.length > 0;
  }

  //TODO: Move to telemetryService?
  private deployWithTelemetry<T>(telemetryEvent: string, callback: Promise<T>): Promise<any> {
    return this.Telemetry.callWithTelemetryAndCatchHandleErrors(telemetryEvent, async function (
      this: IActionContext
    ): Promise<T> {
      return await callback;
    });
  }

  private getGenerationData(data: any): IGenerationData {
    const generationData: IGenerationData = {
      backendFramework: data.backendFramework,
      frontendFramework: data.frontendFramework,
      backendFrameworkLinuxVersion: data.backendFrameworkLinuxVersion,
      pages: data.pages,
      path: data.path,
      projectName: data.projectName,
      projectType: data.projectType,
      services: []
    };

    if(data.services?.appService) {
      const { internalName,subscription,resourceGroup,location,siteName } = data.services.appService;

      const appService: IAppService = {
        internalName,
        category: SERVICE_CATEGORY.AZURE,
        type: SERVICE_TYPE.APPSERVICE,
        subscription,
        resourceGroup,
        location,
        siteName,
      };
      generationData.services?.push(appService);
    }

    if(data.services?.cosmosDB) {
      const { internalName,subscription,resourceGroup,location,accountName, api } = data.services.cosmosDB;

      const cosmosDB: ICosmosDB = {
        internalName,
        category: SERVICE_CATEGORY.AZURE,
        type: SERVICE_TYPE.COSMOSDB,
        subscription,
        resourceGroup,
        location,
        accountName,
        api
      };
      generationData.services?.push(cosmosDB);
    }

    return generationData;
  }
}
