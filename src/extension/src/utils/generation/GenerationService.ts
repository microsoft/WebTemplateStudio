import { AzureServices } from "../../azure/azureServices";
import { MESSAGES } from "../../constants/messages";
import { IActionContext } from "../../telemetry/callWithTelemetryAndErrorHandling";
import { ITelemetryService } from "../../telemetry/telemetryService";
import {
  IAzureService,
  IGenerationData,
  IService,
  SERVICE_CATEGORY,
  SERVICE_TYPE,
} from "../../types/generationTypes";
import { GenerationItemStatus, sendGenerationStatus } from "./generationStatus";
import { IGenerator } from "./IGenerator";
import AppServiceGenerator from "./generators/AppServiceGenerator";
import CosmosDBGenerator from "./generators/CosmosDBGenerator";
import ResourceGroupGenerator from "./generators/ResourceGroupGenerator";
import TemplatesGenerator from "./generators/TemplatesGenerator";

export interface DeployedServiceStatus {
  serviceType: SERVICE_TYPE;
  isDeployed: boolean;
  payload?: any;
}

export default class GenerationService {
  private servicesQueue: Array<Promise<DeployedServiceStatus>> = [];
  private serviceGenerators: Map<SERVICE_TYPE, IGenerator>;
  private resourceGroupGenerator: ResourceGroupGenerator;
  private templatesGenerator: TemplatesGenerator;

  constructor(private Telemetry: ITelemetryService) {
    this.serviceGenerators = new Map<SERVICE_TYPE, IGenerator>([
      [SERVICE_TYPE.APPSERVICE, new AppServiceGenerator()],
      [SERVICE_TYPE.COSMOSDB, new CosmosDBGenerator()],
    ]);
    this.resourceGroupGenerator = new ResourceGroupGenerator(this.Telemetry);
    this.templatesGenerator = new TemplatesGenerator();
  }

  public async generate(generationData: IGenerationData) {
    const generationPath = await this.templatesGenerator.generate(generationData);

    if (generationPath) {
      generationData.path = generationPath;
      await this.generateServices(generationData);
    } else {
      this.rejectServices(generationData.services);
    }
  }

  public rejectServices(services: Array<IService>) {
    const { SERVICE_DEPLOYMENT_HALTED } = MESSAGES.GENERATION;
    services.forEach((service) => {
      const generator = this.serviceGenerators.get(service.type);
      if (generator)
        sendGenerationStatus(generator.serviceType, GenerationItemStatus.Failed, SERVICE_DEPLOYMENT_HALTED);
    });
  }

  public async generateServices(generationData: IGenerationData) {
    this.servicesQueue.length = 0;
    await this.deployAzureServices(generationData);
    const result = await Promise.all(this.servicesQueue);
    this.processAzureService(result);
    return result;
  }

  private async deployAzureServices(generationData: IGenerationData) {
    const { services, projectName } = generationData;
    const azureServices = services.filter((s) => s.category === SERVICE_CATEGORY.AZURE) as Array<IAzureService>;
    await this.resourceGroupGenerator.generate(projectName, azureServices);
    this.deployServices(azureServices as Array<IService>, generationData);
  }

  private processAzureService(result: DeployedServiceStatus[]) {
    //if have deployed appservice and cosmos, update connectionString in appservice
    const cosmosResult = result.find((s) => s.serviceType === SERVICE_TYPE.COSMOSDB);
    const appServiceResult = result.find((s) => s.serviceType === SERVICE_TYPE.APPSERVICE);

    if (appServiceResult?.isDeployed && cosmosResult?.isDeployed && cosmosResult.payload.connectionString !== "") {
      const { resourceGroup, serviceName, connectionString } = appServiceResult.payload;
      AzureServices.updateAppSettings(resourceGroup, serviceName, connectionString);
    }
  }

  private deployServices(services: Array<IService>, generationData: IGenerationData) {
    services.forEach((service) => {
      const generator = this.serviceGenerators.get(service.type);
      if (generator) {
        this.addToDeployQueue(generator.telemetryEventName, generator.generate(service, generationData));
      }
    });
  }

  private addToDeployQueue(telemetryEventName: string, callback: Promise<DeployedServiceStatus>) {
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
