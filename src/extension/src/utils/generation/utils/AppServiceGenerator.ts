import { AzureServices } from "../../../azure/azureServices";
import { TelemetryEventName } from "../../../constants/telemetry";
import { IAppService, IGenerationData, IService, SERVICE_TYPE } from "../../../types/generationPayloadType";
import { sendToClientGenerationStatus, GENERATION_NAMES, GenerationItemStatus } from "../../generationStatus";
import { Logger } from "../../logger";
import { DeployedServiceStatus } from "../GenerationService";
import { IGenerator } from "../IGenerator";

export default class AppServiceGenerator implements IGenerator {
  telemetryEventName = TelemetryEventName.AppServiceDeploy;
  serviceType = SERVICE_TYPE.APPSERVICE;
  generationName = GENERATION_NAMES.APP_SERVICE;

  public async generate(service: IService, generationData: IGenerationData) {
    const appService = service as IAppService;

    const { projectName, backendFrameworkLinuxVersion, path } = generationData;
    const result: DeployedServiceStatus = {
      serviceType: this.serviceType,
      isDeployed: false,
      payload: {
        resourceGroup: appService.resourceGroup,
        serviceName:appService.serviceName
      }
    };

    try {
      sendToClientGenerationStatus(
        this.generationName,
        GenerationItemStatus.Generating,
        "Deploying Azure services (this may take a few minutes)."
      );
      await AzureServices.deployAppService(appService, projectName, backendFrameworkLinuxVersion, path);
      sendToClientGenerationStatus(this.generationName, GenerationItemStatus.Success);
      result.isDeployed = true;
    } catch (error) {
      Logger.appendError("EXTENSION", "Error on deploy Azure App Service:", error);
      sendToClientGenerationStatus(
        this.generationName,
        GenerationItemStatus.Failed,
        "ERROR: App Service failed to deploy"
      );
    }

    return result;
  }
}
