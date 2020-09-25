import { TelemetryEventName } from "../../../constants/telemetry";
import { IDefaultService, IService } from "../../../types/generationPayloadType";
import { DeployedServiceStatus } from "../GenerationServicesService";
import { IGenerator } from "../IGenerator";

export default class DefaultServiceGenerator implements IGenerator {
  telemetryEventName = TelemetryEventName.DefaultServiceDeploy;
  public async generate(service: IService) {
    const defaultService = service as IDefaultService;
    console.log(defaultService);
    const result: DeployedServiceStatus = { serviceType: service.type ,isDeployed: true}
      return await Promise.resolve(result);
  }
}
