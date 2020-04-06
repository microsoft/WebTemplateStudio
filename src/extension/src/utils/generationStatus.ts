import { ExtensionCommand } from "../constants";
import { Controller } from "../controller";

export class GenerationStatus {
  templatesStatus?: boolean;
  resourceGroupStatus?: boolean;
  cosmosStatus?: boolean;
  appServiceStatus?: boolean;

  UpdateGenerationStatusMessage(message: string): void {
    Controller.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.UpdateGenStatusMessage,
      payload: { status: message },
    });
  }

  SendToClientGenerationPath(outputPath: string): void {
    Controller.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.GetOutputPath,
      payload: { outputPath },
    });
  }

  SetTemplatesStatus(value: boolean): void {
    this.templatesStatus = value;
    this.sendGenerationStatus();
  }

  SetResourceGroupStatus(value: boolean): void {
    this.resourceGroupStatus = value;
    this.sendGenerationStatus();
  }

  SetCosmosStatus(value: boolean): void {
    this.cosmosStatus = value;
    this.sendGenerationStatus();
  }

  SetAppServiceStatus(value: boolean): void {
    this.appServiceStatus = value;
    this.sendGenerationStatus();
  }

  private sendGenerationStatus(): void {
    const payload = {
      templates: this.getPayloadValue(this.templatesStatus),
      resourceGroup: this.getPayloadValue(this.resourceGroupStatus),
      cosmos: this.getPayloadValue(this.cosmosStatus),
      appService: this.getPayloadValue(this.appServiceStatus),
    };

    Controller.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.UpdateGenStatus,
      payload,
    });
  }

  private getPayloadValue(statusProperty?: boolean): any {
    if (statusProperty === undefined) {
      return {};
    }
    return {
      success: statusProperty,
      failure: !statusProperty,
    };
  }
}
