import { IGenerationData, IService, SERVICE_TYPE } from "../../types/generationPayloadType";
import { DeployedServiceStatus } from "./GenerationServicesService";

export interface IGenerator {
  generate: (service: IService, generationData: IGenerationData) => Promise<DeployedServiceStatus>;
  telemetryEventName: string;
  serviceType: SERVICE_TYPE;
}