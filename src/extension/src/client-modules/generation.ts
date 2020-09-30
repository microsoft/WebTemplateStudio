import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import {
  CONSTANTS,
} from "../constants/constants";
import { TelemetryEventName } from '../constants/telemetry';
import { ITelemetryService } from "../telemetry/telemetryService";
import { CoreTemplateStudio } from "../coreTemplateStudio";
import { Logger } from "../utils/logger";
import { IAppService, ICosmosDB, IGenerationData, SERVICE_CATEGORY, SERVICE_TYPE } from "../types/generationPayloadType";
import { sendToClientGenerationStatus, GenerationItemStatus, updateStatusMessage, GENERATION_NAMES } from "../utils/generationStatus";
import { EXTENSION_COMMANDS } from "../constants/commands";
import GenerationServicesService from "../utils/generation/GenerationServicesService";

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
      const generationServicesStatus = await service.generate(generationData);
      console.log(generationServicesStatus);

      if (!this.hasAzureServices(generationData)) {
        await this.generateAzureServices();
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

  private async generateAzureServices(): Promise<void> {

    /*
    //if have deployed appservice and cosmos, update connectionString in appservice
    const cosmosResult = result.find((s) => s.serviceType === AzureResourceType.Cosmos);
    if (appService && cosmosResult && cosmosResult.payload.connectionString !== "") {
      AzureServices.updateAppSettings(
        appService.resourceGroup,
        appService.serviceName,
        cosmosResult.payload.connectionString
      );
    }

    */
  }

  private trackWizardTotalSessionTimeToGenerate(): void {
    this.Telemetry.trackEventWithDuration(
      TelemetryEventName.WizardSession,
      this.Telemetry.wizardSessionStartTime,
      Date.now()
    );
  }

  private hasAzureServices(generationData: IGenerationData): boolean {
    return generationData.services.length > 0;
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
      const { internalName,subscription,resourceGroup,location, siteName } = data.services.appService;

      const appService: IAppService = {
        internalName,
        category: SERVICE_CATEGORY.AZURE,
        type: SERVICE_TYPE.APPSERVICE,
        subscription,
        resourceGroup,
        location,
        serviceName: siteName,
      };
      generationData.services?.push(appService);
    }

    if(data.services?.cosmosDB) {
      const { internalName,subscription,resourceGroup,location, accountName, api } = data.services.cosmosDB;

      const cosmosDB: ICosmosDB = {
        internalName,
        category: SERVICE_CATEGORY.AZURE,
        type: SERVICE_TYPE.COSMOSDB,
        subscription,
        resourceGroup,
        location,
        serviceName: accountName,
        api
      };
      generationData.services?.push(cosmosDB);
    }

    return generationData;
  }
}
