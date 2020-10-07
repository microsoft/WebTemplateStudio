import { IGenerationData, IService, SERVICE_TYPE } from "../../types/generationTypes";
import { DeployedServiceStatus } from "./GenerationService";

export interface IGenerator {
  generate: (service: IService, generationData: IGenerationData) => Promise<DeployedServiceStatus>;
  telemetryEventName: string;
  serviceType: SERVICE_TYPE;
}