import { WizardServant, IPayloadResponse } from "../wizardServant";
import { ExtensionCommand } from "../constants";
const child_process = require("child_process");

const NOT_INSTALLED = -1;
const OUTDATED = 0;
const INSTALLED = 1;

const SUPPORTED_PYTHON_VERSION = "3.7.3";
const SUPPORTED_NODE_VERSION_REGEX = /^v10\.[0-9]{1,2}\.[0-9]$/;

export class DependencyChecker extends WizardServant {
  clientCommandMap: Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  >;

  constructor() {
    super();
    this.clientCommandMap = this.defineCommandMap();
  }

  private defineCommandMap(): Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  > {
    return new Map([[ExtensionCommand.CheckDependency, this.checkDependency]]);
  }

  async checkDependency(message: any): Promise<IPayloadResponse> {
    var name = message.payload.dependency;
    var state;
    var stdout;
    try {
      stdout = child_process
        .execSync(name + " --version")
        .toString()
        .trim();
      if (
        (name === "python" &&
          stdout.indexOf(SUPPORTED_PYTHON_VERSION) !== -1) ||
        (name === "node" && SUPPORTED_NODE_VERSION_REGEX.test(stdout))
      ) {
        state = INSTALLED;
      } else {
        state = OUTDATED;
      }
    } catch (error) {
      state = NOT_INSTALLED;
    }

    return {
      payload: {
        dependency: name,
        installationState: state
      }
    };
  }
}
