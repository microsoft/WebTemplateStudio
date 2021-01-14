import { CONSTANTS, PLATFORM } from "../../constants/constants";
import NodeChecker from "./validators/nodeValidator";
import PythonChecker from "./validators/pythonValidator";
import NetCoreChecker from "./validators/netCoreValidator";
import path = require("path");
import { Controller } from "../../controller";
import util = require("util");
import { CLI_SETTINGS } from "../../constants/cli";
import * as os from "os";
import { MESSAGES } from "../../constants/messages";

export default class RequirementsService {
  private exec = util.promisify(require("child_process").exec);
  private validators: Map<string, IRequirementValidator>;

  constructor() {
    this.validators = new Map<string, IRequirementValidator>([
      [CONSTANTS.DEPENDENCY_CHECKER.NODE, new NodeChecker()],
      [CONSTANTS.DEPENDENCY_CHECKER.PYTHON, new PythonChecker()],
      [CONSTANTS.DEPENDENCY_CHECKER.NETCORE, new NetCoreChecker()],
    ]);
  }

  public async isInstalled(requirementName: string, minVersion: string) {
    const requirementValidator = this.validators.get(requirementName);
    const result = requirementValidator ? await requirementValidator.isInstalled(minVersion) : false;
    return result;
  }

  public async getPlatformRequirements(platform: PLATFORM): Promise<IPlatformRequirement[]> {
    if (platform === PLATFORM.REACTNATIVE) {
      return await this.getReactNativeRequirements();
    }
    return [];
  }

  private async getReactNativeRequirements(): Promise<IPlatformRequirement[]> {
    try {
      if (os.platform() !== CLI_SETTINGS.WINDOWS_PLATFORM_VERSION) {
        return [
          {
            name: MESSAGES.WARNINGS.REACT_NATIVE_REQUIRES_WINDOWS_10,
            isInstalled: false,
          },
        ];
      }
      const extensionPath = Controller.vsContext.extensionPath;
      //#WTS: When replacing rnw-dependencies.ps1 file review changes to check no throw is sent on failure
      const scriptPath = path.join(extensionPath, "src", "scripts", "rnw-dependencies.ps1");
      const command = `powershell.exe -File ${scriptPath} -NoPrompt`;
      const { stdout } = await this.exec(command);

      const requirements = this.parsePlatformRequirements(stdout);
      return requirements;
    } catch (err) {
      return [];
    }
  }

  private parsePlatformRequirements(requirements: string): IPlatformRequirement[] {
    const result: IPlatformRequirement[] = [];
    const lines = requirements.split("\n");

    for (const line of lines) {
      const requirement = line.match(/(.*)(ok|(failed))$/i);
      if (requirement && requirement.length > 2) {
        result.push({
          name: requirement[1].trim().replace("Checking ", ""),
          isInstalled: requirement[2] === "OK",
        });
      }
    }
    return result;
  }
}
