import { WizardServant, IPayloadResponse } from "../wizardServant";
import { ExtensionCommand, CONSTANTS } from "../constants";
import os = require("os");
import util = require("util");
import latestVersion from 'latest-version';

const semver = require('semver');
const exec = util.promisify(require("child_process").exec);

const NODE_REGEX = RegExp("v(.+)");
const NODE_REQUIREMENT = ">=10.15.x";
const PYTHON_REGEX = RegExp("Python ([0-9.]+)");
const PYTHON_REQUIREMENT = ">=3.5.x";

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
    return new Map([[ExtensionCommand.CheckDependency, this.checkDependency],
      [ExtensionCommand.GetLatestVersion, this.getLatestVersion]]);
  }

  private async runPythonVersionCommand(command: string): Promise<boolean> {
    let installed: boolean;
    try {
      const { stdout, stderr} = await exec(command + " --version");
      // stderr is also processed for older versions of anaconda!
      const matches = stdout.match(PYTHON_REGEX) || stderr.match(PYTHON_REGEX);
      const version: string = matches[1];
      installed = semver.satisfies(version, PYTHON_REQUIREMENT);
    } catch (err) {
      installed = false;
    }
    return installed;
  }

  async checkDependency(message: any): Promise<IPayloadResponse> {
    const name: string = message.payload.dependency;
    let state = false;
    if (name === CONSTANTS.DEPENDENCY_CHECKER.NODE) {
      try {
        const { stdout } = await exec(
          CONSTANTS.DEPENDENCY_CHECKER.NODE + " --version"
        );
        const version = stdout.match(NODE_REGEX)[1];
        state = semver.satisfies(version, NODE_REQUIREMENT);
      } catch (err) {
        state = false;
      }
    } else if (name === CONSTANTS.DEPENDENCY_CHECKER.PYTHON) {
      const userOS: string = os.platform();
      const userOnWin: boolean = userOS.indexOf("win") === 0;

      if (
        await this.runPythonVersionCommand(CONSTANTS.DEPENDENCY_CHECKER.PYTHON3)
      ) {
        state = true;
      } else if (
        await this.runPythonVersionCommand(CONSTANTS.DEPENDENCY_CHECKER.PYTHON)
      ) {
        state = true;
      } else if (
        userOnWin &&
        (await this.runPythonVersionCommand(
          CONSTANTS.DEPENDENCY_CHECKER.PYTHON_LAUNCHER
        ))
      ) {
        state = true;
      } else {
        state = false;
      }
    }
    return {
      payload: {
        dependency: name,
        installed: state
      }
    };
  }

  public async getLatestVersion(message: any): Promise<any> {
      const checkVersionPackageName = message.payload.checkVersionPackageName;
      const checkVersionPackageSource = message.payload.checkVersionPackageSource;
      let latestVersionStr="";
      if (checkVersionPackageSource==="npm"){
        latestVersionStr = await latestVersion(checkVersionPackageName);
      }

      return Promise.resolve({
        payload: {
          scope:message.payload.scope,
          latestVersion:latestVersionStr
        }
      });
  }

}
