import * as vscode from "vscode";
import { AzureServices } from "../../../azure/azureServices";
import { MESSAGES } from "../../../constants/messages";
import { TelemetryEventName } from "../../../constants/telemetry";
import { Controller } from "../../../controller";
import { ICosmosDB, IGenerationData, IService, SERVICE_TYPE } from "../../../types/generationPayloadType";
import { GenerationItemStatus, sendGenerationStatus } from "../../generationStatus";
import { Logger } from "../../logger";
import { DeployedServiceStatus } from "../GenerationService";
import { IGenerator } from "../IGenerator";

export default class CosmosDBGenerator implements IGenerator {
  telemetryEventName = TelemetryEventName.CosmosDBDeploy;
  serviceType = SERVICE_TYPE.COSMOSDB;

  public async generate(service: IService, generationData: IGenerationData) {
    const cosmosService = service as ICosmosDB;
    const { path, backendFramework } = generationData;
    const { DEPLOY_AZURE_SERVICE, COSMOS_FAILED_TO_DEPLOY } = MESSAGES.GENERATION;
    const { Generating, Success, Failed } = GenerationItemStatus;

    const result: DeployedServiceStatus = {
      serviceType: this.serviceType,
      isDeployed: false,
      payload: { connectionString: "" },
    };

    try {
      sendGenerationStatus(this.serviceType, Generating, DEPLOY_AZURE_SERVICE);
      const connectionString = await AzureServices.deployCosmos(cosmosService, path);
      result.isDeployed = true;
      result.payload.connectionString = connectionString;
      sendGenerationStatus(this.serviceType, Success);
      await this.replaceConnectionString(path, connectionString, backendFramework);
    } catch (error) {
      Logger.appendError("EXTENSION", MESSAGES.ERRORS.DEPLOY_AZURE_COSMOS_DB, error);
      sendGenerationStatus(this.serviceType, Failed, COSMOS_FAILED_TO_DEPLOY);
    }
    return result;
  }

  private async replaceConnectionString(
    path: string,
    connectionString: string,
    backendFramework: string
  ): Promise<void> {
    const eventName = TelemetryEventName.ConnectionStringReplace;
    const { cosmosDBConnectStringReplacePrompt } = MESSAGES.DIALOG_MESSAGES;
    const { yes, no } = MESSAGES.DIALOG_RESPONSES;
    const { FILE_REPLACED_MESSAGE } = MESSAGES.INFO;

    const selection = await vscode.window.showInformationMessage(cosmosDBConnectStringReplacePrompt, ...[yes, no]);

    const startTime = Date.now();
    if (selection === yes) {
      AzureServices.updateConnectionStringToProject(path, connectionString, backendFramework);
      vscode.window.showInformationMessage(FILE_REPLACED_MESSAGE + path);
      Controller.TelemetryService.trackEventWithDuration(eventName, startTime, Date.now());
    }
  }
}
