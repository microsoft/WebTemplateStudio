import { WizardServant, IPayloadResponse } from "../wizardServant";
import { EXTENSION_COMMANDS } from "../constants/commands";
import PackageVersionService from "../utils/packageVersions/PackageVersionService";

export class DependenciesModule extends WizardServant {
  private packageVersionService = new PackageVersionService();
  clientCommandMap: Map<EXTENSION_COMMANDS, (message: any) => Promise<IPayloadResponse>> = new Map([
    [EXTENSION_COMMANDS.GET_LATEST_VERSION, this.getLatestVersion],
  ]);

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
