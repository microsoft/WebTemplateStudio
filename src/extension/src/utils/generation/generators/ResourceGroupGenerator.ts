import { ResourceGroupSelection } from "../../../azure/azure-resource-group/resourceGroupModule";
import { AzureServices } from "../../../azure/azureServices";
import { MESSAGES } from "../../../constants/messages";
import { TelemetryEventName } from "../../../constants/telemetry";
import { IActionContext, ITelemetryService } from "../../../telemetry/telemetryService";
import { IAzureService } from "../../../types/generationTypes";
import { Logger } from "../../logger";

export default class ResourceGroupGenerator {
  constructor(private Telemetry: ITelemetryService) {}

  public async generate(projectName: string, services: IAzureService[]): Promise<void> {
    const resourceGroupQueue: Promise<void>[] = [];

    const resourceGroupName = await AzureServices.generateValidResourceGroupName(projectName, services);
    services.filter((s) => s.resourceGroup === "").forEach((s) => (s.resourceGroup = resourceGroupName));

    const resourceGroups = await AzureServices.getResourceGroupSelections(services);
    resourceGroups.forEach((resourceGroup) => {
      resourceGroupQueue.push(
        this.deployWithTelemetry(TelemetryEventName.ResourceGroupDeploy, this.deployResourceGroup(resourceGroup))
      );
    });

    await Promise.all(resourceGroupQueue);
  }

  private async deployResourceGroup(resourceGroup: ResourceGroupSelection): Promise<void> {
    try {
      await AzureServices.deployResourceGroup(resourceGroup);
    } catch (error) {
      Logger.appendError("EXTENSION", MESSAGES.ERRORS.CREATING_RESOURCE_GROUP, error);
    }
  }

  private deployWithTelemetry<T>(telemetryEvent: string, callback: Promise<T>): Promise<any> {
    return this.Telemetry.callWithTelemetryAndCatchHandleErrors(telemetryEvent, async function (
      this: IActionContext
    ): Promise<T> {
      return await callback;
    });
  }
}
