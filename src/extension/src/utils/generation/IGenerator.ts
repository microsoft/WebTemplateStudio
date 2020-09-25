import { IService } from "../../types/generationPayloadType";
import { DeployedServiceStatus } from "./GenerationServicesService";

export interface IGenerator {
  generate: (service: IService) => Promise<DeployedServiceStatus>;
  telemetryEventName: string;
}