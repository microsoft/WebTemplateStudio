import * as vscode from "vscode";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

import { ChildProcess, spawn } from "child_process";
import { CLI, CLI_SETTINGS } from "./constants/cli";
import { ICommandPayload } from "./types/commandPayload";
import { IGenerationData, IService } from "./types/generationTypes";
import { EventEmitter } from "events";
import { IEngineGenerationPayloadType } from "./types/engineGenerationPayloadType";
import { ISyncPayloadType } from "./types/syncPayloadType";
import { IEngineGenerationTemplateType } from "./types/engineGenerationTemplateType";

class CliEventEmitter extends EventEmitter {}

/**
 * An interface for CoreTS. It should be transparent to the communication
 * channel(s) between WebTS and CoreTS.
 */
export class CoreTemplateStudio {
  private static _instance: CoreTemplateStudio | undefined;
  public static _templateConfig: any;

  private _processCli: ChildProcess;
  private promiseChain: Promise<any>;
  private cliEvents: CliEventEmitter;

  public static GetExistingInstance(): CoreTemplateStudio {
    if (CoreTemplateStudio._instance) {
      return CoreTemplateStudio._instance;
    }

    throw new Error("Cannot GetExistingInstance as none has been created");
  }

  public static async GetInstance(context: vscode.ExtensionContext | undefined): Promise<CoreTemplateStudio> {
    if (CoreTemplateStudio._instance) {
      return Promise.resolve(CoreTemplateStudio._instance);
    }

    const platform = process.platform;
    let cliExecutableName = CLI.BASE_CLI_TOOL_NAME;
    let extensionPath;

    if (context) {
      extensionPath = context.extensionPath;
    } else {
      extensionPath = path.join(__dirname, "..");
    }

    if (platform === CLI_SETTINGS.WINDOWS_PLATFORM_VERSION) {
      cliExecutableName += ".exe";
    }

    const cliPath = path.join(extensionPath, "src", "corets-cli", platform, cliExecutableName);

    const cliWorkingDirectory = path.join(extensionPath, "src", "corets-cli", platform);

    if (os.platform() !== CLI_SETTINGS.WINDOWS_PLATFORM_VERSION) {
      // Not unsafe as the parameter comes from trusted source
      fs.chmodSync(cliPath, 0o755);
    }

    const spawnedProcessCli = spawn(cliPath, [], {
      cwd: cliWorkingDirectory,
    });

    CoreTemplateStudio._instance = new CoreTemplateStudio(spawnedProcessCli);
    return CoreTemplateStudio._instance;
  }

  public static DestroyInstance(): void {
    if (CoreTemplateStudio._instance) {
      CoreTemplateStudio._instance.stop();
      CoreTemplateStudio._instance = undefined;
    }
  }

  private constructor(processCli: ChildProcess) {
    this._processCli = processCli;
    this.promiseChain = Promise.resolve(null);
    this.cliEvents = new CliEventEmitter();
    this.readStream(this._processCli);
  }

  // This function is a listener, in the constructor, it gets attached
  // then it will always get triggered when a command is write to the cli and there is responses from cli, until the process gets killed
  public async readStream(process: ChildProcess): Promise<void> {
    let data = "";
    if (process.stdout) {
      process.stdout.on("data", (chunk) => {
        data += chunk;
        const responses = data.toString().split("\n");
        for (let i = 0; i < responses.length - 1; i++) {
          const result = JSON.parse(responses[i]);
          this.cliEvents.emit(result["messageType"], result["content"]);
        }
        data = responses[responses.length - 1];
      });
    }

    if (process.stderr) {
      process.stderr.on("data", (data) => {
        this.cliEvents.emit("eventError", data.toString());
      });
      process.on("exit", (code) => this.cliEvents.emit("eventError", `process exited with code ${code}`));
    }
  }

  private async awaitCliEvent(eventName: string, command: string): Promise<any> {
    this.promiseChain = this.promiseChain.then(() => {
      if (this._processCli.stdin) {
        this._processCli.stdin.write(command);
      }
      return new Promise((resolve, reject) => {
        this.cliEvents
          .once(eventName, (data) => {
            this.cliEvents.removeAllListeners();
            resolve(data);
          })
          .once("eventError", (data) => {
            this.cliEvents.removeAllListeners();
            reject(new Error(data));
            //Reset promise chain to allow execute next Cli command
            this.promiseChain = Promise.resolve(null);
          });
      });
    });
    return this.promiseChain;
  }

  public async sync(payload: ICommandPayload): Promise<any> {
    const typedPayload = payload.payload as ISyncPayloadType;
    const syncCommand = `${CLI.SYNC_COMMAND_PREFIX} -p ${typedPayload.path} -t ${typedPayload.platform}\n`;
    this.cliEvents.on(CLI.SYNC_PROGRESS_STATE, (data) => {
      payload.liveMessageHandler(data["status"], data["progress"]);
    });
    return this.awaitCliEvent(CLI.SYNC_COMPLETE_STATE, syncCommand);
  }

  public async getFrameworks(projectType: string): Promise<any> {
    const getFrameworksCommand = `${CLI.GET_FRAMEWORKS} -p ${projectType}\n`;
    return this.awaitCliEvent(CLI.GET_FRAMEWORKS_RESULT, getFrameworksCommand);
  }

  public getTemplateConfig(): any {
    return CoreTemplateStudio._templateConfig;
  }

  public async getPages(
    projectType: string,
    frontendFramework: string,
    backendFramework: string
  ): Promise<any> {
    let getPagesCommand = `${CLI.GET_PAGES} -p ${projectType} `;
    if (frontendFramework !== "") {
      getPagesCommand = getPagesCommand.concat(`-f ${frontendFramework} `);
    }
    if (backendFramework !== "") {
      getPagesCommand = getPagesCommand.concat(`-b ${backendFramework}`);
    }
    getPagesCommand = getPagesCommand.concat(`\n`);

    return this.awaitCliEvent(
      CLI.GET_PAGES_RESULT,
      getPagesCommand
    );
  }

  public async getAllLicenses(generationData: IGenerationData): Promise<any> {
    const getAllLicensesPayload = JSON.stringify(this.makeEngineGenerationPayload(generationData));
    const getAllLicensesCommand = `${CLI.GET_ALL_LICENSES} -d ${getAllLicensesPayload}\n`;

    return this.awaitCliEvent(CLI.GET_ALL_LICENSES_RESULT, getAllLicensesCommand);
  }

  public async getFeatures(projectType: string, frontendFramework: string, backendFramework: string): Promise<any> {
    // to use this in client
    const getFeaturesCommand = `${CLI.GET_FEATURES} -p ${projectType} -f ${frontendFramework} -b ${backendFramework}\n`;
    return this.awaitCliEvent(CLI.GET_FEATURES_RESULT, getFeaturesCommand);
  }

  public async getProjectTypes(): Promise<any> {
    // to use this in client
    const getProjectTypesCommand = `${CLI.GET_PROJECT_TYPES}\n`;
    return this.awaitCliEvent(CLI.GET_PROJECT_TYPES_RESULT, getProjectTypesCommand);
  }

  public async generate(payload: ICommandPayload): Promise<any> {
    const typedPayload = payload.payload as IGenerationData;
    const generatePayload = JSON.stringify(this.makeEngineGenerationPayload(typedPayload));
    const generateCommand = `${CLI.GENERATE} -d ${generatePayload}\n`;
    const projectItemsToGenerateCount = 4; // Derived from CoreTS logic
    const itemsToGenerateCount = projectItemsToGenerateCount + typedPayload.pages.length + typedPayload.services.length;
    let generatedItemsCount = 0;

    this.cliEvents.on(CLI.GENERATE_PROGRESS, (data) => {
      generatedItemsCount++;
      const percentage = (generatedItemsCount / itemsToGenerateCount) * 100;
      const messageWithProgress = `(${percentage.toFixed(0)}%) ${data}`;
      payload.liveMessageHandler(messageWithProgress);
    });
    return await this.awaitCliEvent(CLI.GENERATE_RESULT, generateCommand);
  }

  private makeEngineGenerationPayload(payload: IGenerationData): IEngineGenerationPayloadType {
    const { projectName, path, projectType, frontendFramework, backendFramework, pages, services } = payload;

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
        templateid: page.identity,
      })),
      features: this.getServiceTemplateInfo(services),
    };
  }

  private getServiceTemplateInfo(services: IService[]): any {
    const servicesInfo: IEngineGenerationTemplateType[] = [];

    services.forEach((service) => {
      servicesInfo.push({
        name: service.serviceName,
        templateid: service.internalName,
      });
    });

    return servicesInfo;
  }

  public stop(): void {
    if (this._processCli) {
      this.killProcess(this._processCli);
    }
  }

  private killProcess(processToKill: ChildProcess): void {
    if (process.platform === CLI_SETTINGS.WINDOWS_PLATFORM_VERSION) {
      const pid = processToKill.pid;
      const spawn = require("child_process").spawn;
      spawn("taskkill", ["/pid", pid, "/f", "/t"]);
    } else {
      processToKill.kill("SIGKILL");
    }
  }
}
