import { TelemetryEventName } from "../../../constants/telemetry";
import { IAppService, IService } from "../../../types/generationPayloadType";
import { DeployedServiceStatus } from "../GenerationServicesService";
import { IGenerator } from "../IGenerator";

export default class AppServiceGenerator implements IGenerator {
  telemetryEventName = TelemetryEventName.AppServiceDeploy;
  public async generate(service: IService) {
    const appService = service as IAppService;
    console.log(appService);
    const result: DeployedServiceStatus = { serviceType: service.type ,isDeployed: true}
      return await Promise.resolve(result);

  }

}
