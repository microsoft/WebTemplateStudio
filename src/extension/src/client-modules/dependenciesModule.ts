import { WizardServant, IPayloadResponse } from "../wizardServant";
import { EXTENSION_COMMANDS } from "../constants/commands";
import RequirementsService from "../utils/requirements/requirementsService";
import PackageVersionService from "../utils/packageVersions/PackageVersionService";

export class DependenciesModule extends WizardServant {
  private requirementsService = new RequirementsService();
  private packageVersionService = new PackageVersionService();
  clientCommandMap: Map<EXTENSION_COMMANDS, (message: any) => Promise<IPayloadResponse>> = new Map([
    [EXTENSION_COMMANDS.GET_DEPENDENCY_INFO, this.requirementIsInstalled],
    [EXTENSION_COMMANDS.GET_LATEST_VERSION, this.getLatestVersion],
  ]);

  async requirementIsInstalled(message: any): Promise<IPayloadResponse> {
    const dependency = message.payload.dependency as string;
    const installed = await this.requirementsService.isInstalled(dependency);
    return {
      payload: {
        dependency,
        installed,
      },
    };
  }

  public async getLatestVersion(message: any): Promise<any> {
    const { name, source } = message.payload.checkVersionPackage;
    const latestVersion = await this.packageVersionService.getLatestVersion(name, source);
    return {
      payload: {
        latestVersion,
      },
    };
  }
}
