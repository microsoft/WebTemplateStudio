import * as vscode from "vscode";
import { WizardServant, IPayloadResponse } from "../wizardServant";
import { CONSTANTS } from "../constants/constants";
import { TelemetryEventName } from "../constants/telemetry";
import { ITelemetryService } from "../telemetry/telemetryService";
import {
  IAppService,
  ICosmosDB,
  IGenerationData,
  SERVICE_CATEGORY,
  SERVICE_TYPE,
} from "../types/generationTypes";
import { EXTENSION_COMMANDS } from "../constants/commands";
import GenerationService from "../utils/generation/GenerationService";

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

    const generationService = new GenerationService(this.Telemetry);
    const generationData = this.getGenerationData(message.payload);
    await generationService.generate(generationData);

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

  private trackWizardTotalSessionTimeToGenerate(): void {
    this.Telemetry.trackEventWithDuration(
      TelemetryEventName.WizardSession,
      this.Telemetry.wizardSessionStartTime,
      Date.now()
    );
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
      services: [],
    };

    if (data.services?.appService) {
      const { internalName, subscription, resourceGroup, location, siteName } = data.services.appService;

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

    if (data.services?.cosmosDB) {
      const { internalName, subscription, resourceGroup, location, accountName, api } = data.services.cosmosDB;

      const cosmosDB: ICosmosDB = {
        internalName,
        category: SERVICE_CATEGORY.AZURE,
        type: SERVICE_TYPE.COSMOSDB,
        subscription,
        resourceGroup,
        location,
        serviceName: accountName,
        api,
      };
      generationData.services?.push(cosmosDB);
    }

    return generationData;
  }
}
