import * as vscode from "vscode";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

import { ChildProcess, spawn } from "child_process";
import { CONSTANTS } from "./constants";
import { ICommandPayload } from "./types/commandPayload";
import { IGenerationPayloadType } from "./types/generationPayloadType";
import { EventEmitter } from "events";
import { IEngineGenerationPayloadType } from "./types/engineGenerationPayloadType";

class CliEventEmitter extends EventEmitter { }

/**
 * An interface for CoreTS. It should be transparent to the communication
 * channel(s) between WebTS and CoreTS.
 */
export class CoreTemplateStudio {
  private static _instance: CoreTemplateStudio | undefined;

  private _processCli: ChildProcess;
  private cliEvents: CliEventEmitter;

  public static GetExistingInstance(): CoreTemplateStudio {
    if (CoreTemplateStudio._instance) {
      return CoreTemplateStudio._instance;
    }

    throw new Error("Cannot GetExistingInstance as none has been created");
  }

  public static async GetInstance(
    context: vscode.ExtensionContext | undefined
  ): Promise<CoreTemplateStudio> {
    if (CoreTemplateStudio._instance) {
      return Promise.resolve(CoreTemplateStudio._instance);
    }

    let platform = process.platform;
    let cliExecutableName = CONSTANTS.CLI.BASE_CLI_TOOL_NAME;
    let extensionPath;

    if (context) {
      extensionPath = context.extensionPath;
    } else {
      extensionPath = path.join(__dirname, "..");
    }

    if (platform === CONSTANTS.CLI.WINDOWS_PLATFORM_VERSION) {
      cliExecutableName += ".exe";
    }

    let cliPath = path.join(
      extensionPath,
      "src",
      "corets-cli",
      platform,
      cliExecutableName
    );

    let cliWorkingDirectory = path.join(extensionPath, "src", "corets-cli", platform);

    if (os.platform() !== CONSTANTS.CLI.WINDOWS_PLATFORM_VERSION) {
      // Not unsafe as the parameter comes from trusted source
      // tslint:disable-next-line:non-literal-fs-path
      fs.chmodSync(cliPath, 0o755);
    }

    const spawnedProcessCli = spawn(cliPath, [], {
      cwd: cliWorkingDirectory
    });

    CoreTemplateStudio._instance = new CoreTemplateStudio(
      spawnedProcessCli
    );
    return CoreTemplateStudio._instance;
  }

  public static DestroyInstance() {
    if (CoreTemplateStudio._instance) {
      CoreTemplateStudio._instance.stop();
      CoreTemplateStudio._instance = undefined;
    }
  }

  private constructor(processCli: ChildProcess) {
    this._processCli = processCli;
    this.cliEvents = new CliEventEmitter();
    this.readStream(this._processCli);
  }

  // This function is a listener, in the constructor, it gets attached
  // then it will always get triggered when a command is write to the cli and there is responses from cli, until the process gets killed
  public async readStream(process: ChildProcess) {
    let data = "";
    process.stdout.on("data", (chunk) => {
      data += chunk;
      var responses = data.toString().split("\n");
      for (let i = 0; i < responses.length - 1; i++) {
        var result = JSON.parse(responses[i]);
        this.cliEvents.emit(result['messageType'], result['content']);
      }
      data = responses[responses.length - 1];
    });

    process.stderr.on("data", (data) => {
      this.cliEvents.emit("error", data.toString());
    });
  }

  private async awaitCliEvent(eventName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cliEvents.once(eventName, (data) => {
        this.cliEvents.removeAllListeners();
        resolve(data);
      });
      this.cliEvents.once("error", (data) => {
        this.cliEvents.removeAllListeners();
        reject(data);
      });
    });
  }

  public async sync(payload: ICommandPayload): Promise<any> {
    let syncCommand = `${CONSTANTS.CLI.SYNC_COMMAND_PREFIX} -p ${payload.payload.path}\n`;
    this._processCli.stdin.write(syncCommand);
    this.cliEvents.on(CONSTANTS.CLI.SYNC_PROGRESS_STATE, (data) => {
      payload.liveMessageHandler(data['status'], data['progress']);
    });
    return await this.awaitCliEvent(CONSTANTS.CLI.SYNC_COMPLETE_STATE);
  }

  public async getFrameworks(projectType: string): Promise<any> {
    const getFrameworksCommand = `${CONSTANTS.CLI.GET_FRAMEWORKS_COMMAND_PREFIX} -p ${projectType}\n`;
    this._processCli.stdin.write(getFrameworksCommand);
    return await this.awaitCliEvent(CONSTANTS.CLI.GET_FRAMEWORKS_COMPLETE_STATE);
  }

  public async getPages(
    projectType: string,
    frontendFramework: string,
    backendFramework: string
  ): Promise<any> {
    const getPagesCommand = `${CONSTANTS.CLI.GET_PAGES_COMMAND_PREFIX} -p ${projectType} -f ${frontendFramework} -b ${backendFramework}\n`;
    this._processCli.stdin.write(getPagesCommand);
    return await this.awaitCliEvent(CONSTANTS.CLI.GET_PAGES_COMPLETE_STATE);
  }

  public async getFeatures(
    projectType: string,
    frontendFramework: string,
    backendFramework: string
  ): Promise<any> {
    // to use this in client
    const getFeaturesCommand = `${CONSTANTS.CLI.GET_FEATURES_COMMAND_PREFIX} -p ${projectType} -f ${frontendFramework} -b ${backendFramework}\n`;
    this._processCli.stdin.write(getFeaturesCommand);
    return await this.awaitCliEvent(CONSTANTS.CLI.GET_FEATURES_COMPLETE_STATE);
  }

  public async getProjectTypes(): Promise<any> {
    // to use this in client
    const getProjectTypesCommand = `${CONSTANTS.CLI.GET_PROJECT_TYPES_COMMAND_PREFIX}\n`;
    this._processCli.stdin.write(getProjectTypesCommand);
    return await this.awaitCliEvent(CONSTANTS.CLI.GET_PROJECT_TYPES_COMPLETE_STATE);
  }

  public async generate(payload: ICommandPayload): Promise<any> {
    var generatePayload = JSON.stringify(this.makeEngineGenerationPayload(<IGenerationPayloadType>(payload.payload)));
    const generateCommand = `${CONSTANTS.CLI.GENERATE_COMMAND_PREFIX} -d ${generatePayload}\n`;
    this._processCli.stdin.write(generateCommand);
    this.cliEvents.on(CONSTANTS.CLI.GENERATE_PROGRESS_STATE, (data) => {
      payload.liveMessageHandler(data['status'], data['progress']);
    });
    return await this.awaitCliEvent(CONSTANTS.CLI.GENERATE_COMPLETE_STATE);
  }

  private makeEngineGenerationPayload(
    payload: IGenerationPayloadType
  ): IEngineGenerationPayloadType {
    let {
      projectName,
      path,
      projectType,
      frontendFramework,
      backendFramework,
      pages,
      services
    } = payload;

    return {
      projectName: projectName,
      genPath: path,
      projectType: projectType,
      frontendFramework: frontendFramework,
      backendFramework: backendFramework,
      language: "Any",
      platform: "Web",
      homeName: "Test",
      pages: pages.map((page: any) => ({
        name: page.name,
        templateid: page.identity
      })),
      features: services.map((service: any) => ({
        name: service.name,
        templateid: service.identity
      }))
    };
  }

  public stop() {
    if (this._processCli) {
      this.killProcess(this._processCli);
    }
  }

  private killProcess(processToKill: ChildProcess) {
    if (process.platform === CONSTANTS.CLI.WINDOWS_PLATFORM_VERSION) {
      let pid = processToKill.pid;
      let spawn = require("child_process").spawn;
      spawn("taskkill", ["/pid", pid, "/f", "/t"]);
    } else {
      processToKill.kill("SIGKILL");
    }
  }
}
