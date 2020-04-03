import { ReactPanel } from "../reactPanel";
import { ExtensionCommand } from "../constants";

export class GenerationStatus {
  templatesStatus: boolean|undefined;
  resourceGroupStatus: boolean|undefined;
  cosmosStatus: boolean|undefined;
  appServiceStatus: boolean|undefined;

  constructor(private reactPanelContext: ReactPanel) {}

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
    this.reactPanelContext.postMessageWebview({
      command: ExtensionCommand.UpdateGenStatus,
      payload: {
        templates: this.templatesStatus ? this.getProgressObject(this.templatesStatus) : {},
        resourceGroup: this.resourceGroupStatus ? this.getProgressObject(this.resourceGroupStatus) : {},
        cosmos: this.cosmosStatus ? this.getProgressObject(this.cosmosStatus) : {},
        appService: this.appServiceStatus ? this.getProgressObject(this.appServiceStatus) : {},
      },
    });
  }

  private getProgressObject(didSucceed: boolean|undefined): any {
    return {
      success: didSucceed,
      failure: !didSucceed,
    };
  }
}
