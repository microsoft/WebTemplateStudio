import * as vscode from "vscode";
import { AzureServices } from "../../../azure/azureServices";
import { MESSAGES } from "../../../constants/messages";
import { TelemetryEventName } from "../../../constants/telemetry";
import { Controller } from "../../../controller";
import { ICosmosDB, IGenerationData, IService, SERVICE_TYPE } from "../../../types/generationPayloadType";
import { GenerationItemStatus, GENERATION_NAMES, sendToClientGenerationStatus } from "../../generationStatus";
import { Logger } from "../../logger";
import { DeployedServiceStatus } from "../GenerationServicesService";
import { IGenerator } from "../IGenerator";

export default class CosmosDBGenerator implements IGenerator {
  telemetryEventName = TelemetryEventName.CosmosDBDeploy;
  serviceType = SERVICE_TYPE.COSMOSDB;

  public async generate(service: IService, generationData: IGenerationData) {
    const cosmosService = service as ICosmosDB;
    const { path, backendFramework } = generationData;
    const result: DeployedServiceStatus = {
      serviceType: this.serviceType,
      isDeployed: false,
      payload: { connectionString: "" },
    };
    try {
      sendToClientGenerationStatus(
        GENERATION_NAMES.COSMOS_DB,
        GenerationItemStatus.Generating,
        "Deploying Azure services (this may take a few minutes)."
      );
      const connectionString = await AzureServices.deployCosmos(cosmosService, path);
      sendToClientGenerationStatus(GENERATION_NAMES.COSMOS_DB, GenerationItemStatus.Success);
      result.isDeployed = true;
      result.payload.connectionString = connectionString;
      await this.replaceConnectionString(path, connectionString, backendFramework);
    } catch (error) {
      Logger.appendError("EXTENSION", "Error on deploy CosmosDB Service:", error);
      sendToClientGenerationStatus(
        GENERATION_NAMES.COSMOS_DB,
        GenerationItemStatus.Failed,
        "ERROR: Cosmos DB failed to deploy"
      );
    }
    return result;
  }

  private async replaceConnectionString(
    path: string,
    connectionString: string,
    backendFramework: string
  ): Promise<void> {
    const { cosmosDBConnectStringReplacePrompt } = MESSAGES.DIALOG_MESSAGES;
    const { yes, no } = MESSAGES.DIALOG_RESPONSES;
    const { FILE_REPLACED_MESSAGE } = MESSAGES.INFO;

    const selection = await vscode.window.showInformationMessage(cosmosDBConnectStringReplacePrompt, ...[yes, no]);

    const startTime = Date.now();
    if (selection === yes) {
      AzureServices.updateConnectionStringToProject(path, connectionString, backendFramework);
      vscode.window.showInformationMessage(FILE_REPLACED_MESSAGE + path);
      Controller.TelemetryService.trackEventWithDuration(
        TelemetryEventName.ConnectionStringReplace,
        startTime,
        Date.now()
      );
    }
  }
}
