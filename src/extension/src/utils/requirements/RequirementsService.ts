import * as vscode from "vscode";
const opn = require("opn");
import { CONSTANTS, PLATFORM, WEB_TEMPLATE_STUDIO_LINKS } from "../../constants/constants";
import NodeChecker from "./validators/nodeValidator";
import PythonChecker from "./validators/pythonValidator";
import NetCoreChecker from "./validators/netCoreValidator";
import path = require("path");
import { Controller } from "../../controller";
import util = require("util");
import { CLI_SETTINGS } from "../../constants/cli";
import * as os from "os";
import { MESSAGES } from "../../constants/messages";
import { Logger } from "../logger";

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
    } catch (error) {
      Logger.appendLog("EXTENSION", "error", MESSAGES.WARNINGS.ERROR_ON_GET_REACT_NATIVE_REQUIREMENTS + error.message);
      this.showRequirementErrorMessage();
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

  private showRequirementErrorMessage() {
    const { getReactNativeRequirementsError } = MESSAGES.DIALOG_MESSAGES;
    const { viewReactNativeDocs, showLog } = MESSAGES.DIALOG_RESPONSES;
    const { REACT_NATIVE_REQUIREMENTS_DOC } = WEB_TEMPLATE_STUDIO_LINKS;

    vscode.window
      .showWarningMessage(getReactNativeRequirementsError, ...[viewReactNativeDocs, showLog])
      .then((result) => {
        if (result === viewReactNativeDocs) {
          opn(REACT_NATIVE_REQUIREMENTS_DOC);
        } else if (result === showLog) {
          vscode.workspace
            .openTextDocument(Logger.filename)
            .then((TextDocument) => vscode.window.showTextDocument(TextDocument));
        }
      });
  }
}
