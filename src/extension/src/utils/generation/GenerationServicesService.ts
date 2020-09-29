import { IActionContext } from "../../telemetry/callWithTelemetryAndErrorHandling";
import { ITelemetryService } from "../../telemetry/telemetryService";
import {
  IAzureService,
  IService,
  SERVICE_CATEGORY,
  SERVICE_TYPE,
} from "../../types/generationPayloadType";
import { IGenerator } from "./IGenerator";
import AppServiceGenerator from "./utils/AppServiceGenerator";
import CosmosDBGenerator from "./utils/CosmosDBGenerator";
import ResourceGroupGenerator from "./utils/ResourceGroupGenerator";

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
      [SERVICE_TYPE.APPSERVICE, new AppServiceGenerator()],
      [SERVICE_TYPE.COSMOSDB, new CosmosDBGenerator()],
    ]);
  }

  public async generate(services: Array<IService>, projectName: string) {
    this.servicesQueue.length = 0;

    await this.generateAzureServices(services, projectName);
    const result = await Promise.all(this.servicesQueue);
    return result;
  }

  private async generateAzureServices(services: Array<IService>, projectName: string) {
    const azureServices = services.filter((s) => s.category === SERVICE_CATEGORY.AZURE) as Array<IAzureService>;
    const resourceGroupGenerator = new ResourceGroupGenerator(this.Telemetry);
    await resourceGroupGenerator.generate(projectName, azureServices);
    this.generateServices(azureServices as Array<IService>);
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
