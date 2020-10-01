import { AzureServices } from "../../../azure/azureServices";
import { MESSAGES } from "../../../constants/messages";
import { TelemetryEventName } from "../../../constants/telemetry";
import { IAppService, IGenerationData, IService, SERVICE_TYPE } from "../../../types/generationTypes";
import { sendGenerationStatus, GenerationItemStatus } from "../../generationStatus";
import { Logger } from "../../logger";
import { DeployedServiceStatus } from "../GenerationService";
import { IGenerator } from "../IGenerator";

export default class AppServiceGenerator implements IGenerator {
  telemetryEventName = TelemetryEventName.AppServiceDeploy;
  serviceType = SERVICE_TYPE.APPSERVICE;

  public async generate(service: IService, generationData: IGenerationData) {
    const appService = service as IAppService;
    const { projectName, backendFrameworkLinuxVersion, path } = generationData;
    const { DEPLOY_AZURE_SERVICE, APPSERVICE_FAILED_TO_DEPLOY } = MESSAGES.GENERATION;
    const { Generating, Success, Failed } = GenerationItemStatus;

    const result: DeployedServiceStatus = {
      serviceType: this.serviceType,
      isDeployed: false,
      payload: {
        resourceGroup: appService.resourceGroup,
        serviceName: appService.serviceName,
      },
    };

    try {
      sendGenerationStatus(this.serviceType, Generating, DEPLOY_AZURE_SERVICE);
      await AzureServices.deployAppService(appService, projectName, backendFrameworkLinuxVersion, path);
      sendGenerationStatus(this.serviceType, Success);
      result.isDeployed = true;
    } catch (error) {
      Logger.appendError("EXTENSION", MESSAGES.ERRORS.DEPLOY_AZURE_APP_SERVICE, error);
      sendGenerationStatus(this.serviceType, Failed, APPSERVICE_FAILED_TO_DEPLOY);
    }

    return result;
  }
}
