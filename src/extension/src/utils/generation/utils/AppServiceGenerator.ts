import { AzureServices } from "../../../azure/azureServices";
import { TelemetryEventName } from "../../../constants/telemetry";
import { IAppService, IGenerationData, IService, SERVICE_TYPE } from "../../../types/generationPayloadType";
import { sendToClientGenerationStatus, GENERATION_NAMES, GenerationItemStatus } from "../../generationStatus";
import { Logger } from "../../logger";
import { DeployedServiceStatus } from "../GenerationServicesService";
import { IGenerator } from "../IGenerator";

export default class AppServiceGenerator implements IGenerator {
  telemetryEventName = TelemetryEventName.AppServiceDeploy;
  serviceType = SERVICE_TYPE.APPSERVICE;

  public async generate(service: IService, generationData: IGenerationData) {
    const appService = service as IAppService;

    const { projectName, backendFrameworkLinuxVersion, path } = generationData;
    const result: DeployedServiceStatus = {
      serviceType: this.serviceType,
      isDeployed: false,
    };

    try {
      sendToClientGenerationStatus(
        GENERATION_NAMES.APP_SERVICE,
        GenerationItemStatus.Generating,
        "Deploying Azure services (this may take a few minutes)."
      );
      await AzureServices.deployAppService(appService, projectName, backendFrameworkLinuxVersion, path);
      sendToClientGenerationStatus(GENERATION_NAMES.APP_SERVICE, GenerationItemStatus.Success);
      result.isDeployed = true;
    } catch (error) {
      Logger.appendError("EXTENSION", "Error on deploy Azure App Service:", error);
      sendToClientGenerationStatus(
        GENERATION_NAMES.APP_SERVICE,
        GenerationItemStatus.Failed,
        "ERROR: App Service failed to deploy"
      );
    }

    return result;
  }
}
