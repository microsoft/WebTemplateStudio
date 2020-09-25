import { AzureResourceType } from "../../constants/constants";
import { IActionContext } from "../../telemetry/callWithTelemetryAndErrorHandling";
import { ITelemetryService } from "../../telemetry/telemetryService";
import {
  IAzureService,
  IDefaultService,
  IService,
  SERVICE_CATEGORY,
  SERVICE_TYPE,
} from "../../types/generationPayloadType";
import { IGenerator } from "./IGenerator";
import AppServiceGenerator from "./utils/AppServiceGenerator";
import CosmosDBGenerator from "./utils/CosmosDBGenerator";
import DefaultServiceGenerator from "./utils/DefaultServiceGenerator";

export interface DeployedServiceStatus {
  serviceType: SERVICE_TYPE;
  isDeployed: boolean;
  payload?: any;
}

export default class GenerationServicesService {
  private servicesQueue: Array<Promise<DeployedServiceStatus>> = [];
  private generators: Map<SERVICE_TYPE, IGenerator>;

  constructor(private Telemetry: ITelemetryService) {
    this.generators = new Map<SERVICE_TYPE, IGenerator>([
      [SERVICE_TYPE.DEFAULT, new DefaultServiceGenerator()],
      [SERVICE_TYPE.APPSERVICE, new AppServiceGenerator()],
      [SERVICE_TYPE.COSMOSDB, new CosmosDBGenerator()],
    ]);
  }

  public async generate(services: Array<IService>) {
    this.servicesQueue.length = 0;

    this.generateAzureServices(services);
    this.generateDefaultServices(services);

    const result = await Promise.all(this.servicesQueue);
    return result;
  }

  private async generateAzureServices(services: Array<IService>) {
    const azureServices = services.filter((s) => s.category === SERVICE_CATEGORY.AZURE) as Array<IAzureService>;
    this.generateServices(azureServices as Array<IService>);
  }

  private generateDefaultServices(services: Array<IService>) {
    const defaultServices = services.filter((s) => s.category === SERVICE_CATEGORY.DEFAULT) as Array<IDefaultService>;
    this.generateServices(defaultServices);
  }

  private generateServices(services: Array<IService>) {
    services.forEach((service) => {
      const generator = this.generators.get(service.type);
      if (generator) {
        this.addToGenerationQueue(generator.telemetryEventName, generator.generate(service));
      }
    });
  }

  private addToGenerationQueue(telemetryEventName: string, callback: Promise<DeployedServiceStatus>) {
    this.servicesQueue.push(this.deployWithTelemetry(telemetryEventName, callback));
  }

  private deployWithTelemetry<T>(telemetryEvent: string, callback: Promise<T>): Promise<any> {
    return this.Telemetry.callWithTelemetryAndCatchHandleErrors(telemetryEvent, async function (
      this: IActionContext
    ): Promise<T> {
      return await callback;
    });
  }
}
