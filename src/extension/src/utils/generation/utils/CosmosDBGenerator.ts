import { TelemetryEventName } from "../../../constants/telemetry";
import { ICosmosDB, IService } from "../../../types/generationPayloadType";
import { DeployedServiceStatus } from "../GenerationServicesService";
import { IGenerator } from "../IGenerator";

export default class CosmosDBGenerator implements IGenerator{
  telemetryEventName = TelemetryEventName.CosmosDBDeploy;
  public async generate(service: IService) {
    const cosmosDB = service as ICosmosDB;
    console.log(cosmosDB);
    const result: DeployedServiceStatus = { serviceType: service.type ,isDeployed: true}
      return await Promise.resolve(result);
  }
}
