import * as vscode from "vscode";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

import { ChildProcess, spawn } from "child_process";
import { CONSTANTS } from "./constants/constants";
import { ICommandPayload } from "./types/commandPayload";
import { IGenerationPayloadType } from "./types/generationPayloadType";
import { EventEmitter } from "events";
import { IEngineGenerationPayloadType } from "./types/engineGenerationPayloadType";

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

  public static async GetInstance(
    context: vscode.ExtensionContext | undefined
  ): Promise<CoreTemplateStudio> {
    if (CoreTemplateStudio._instance) {
      return Promise.resolve(CoreTemplateStudio._instance);
    }

    const platform = process.platform;
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

    const cliPath = path.join(
      extensionPath,
      "src",
      "corets-cli",
      platform,
      cliExecutableName
    );

    const cliWorkingDirectory = path.join(
      extensionPath,
      "src",
      "corets-cli",
      platform
    );

    if (os.platform() !== CONSTANTS.CLI.WINDOWS_PLATFORM_VERSION) {
      // Not unsafe as the parameter comes from trusted source
      fs.chmodSync(cliPath, 0o755);
    }

    const spawnedProcessCli = spawn(cliPath, [], {
      cwd: cliWorkingDirectory
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
    if(process.stdout) {
      process.stdout.on("data", chunk => {
        data += chunk;
        const responses = data.toString().split("\n");
        for (let i = 0; i < responses.length - 1; i++) {
          const result = JSON.parse(responses[i]);
          this.cliEvents.emit(result["messageType"], result["content"]);
        }
        data = responses[responses.length - 1];
      });
    }
    
    if(process.stderr) {
      process.stderr.on("data", data => {
        this.cliEvents.emit("eventError", data.toString());
      });
      process.on("exit", code =>
        this.cliEvents.emit("eventError", `process exited with code ${code}`)
      );
    }    
  }

  private async awaitCliEvent(
    eventName: string,
    command: string
  ): Promise<any> {
    this.promiseChain = this.promiseChain.then(() => {
      if(this._processCli.stdin) {
        this._processCli.stdin.write(command);
      }      
      return new Promise((resolve, reject) => {
        this.cliEvents
          .once(eventName, data => {
            this.cliEvents.removeAllListeners();
            resolve(data);
          })
          .once("eventError", data => {
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
    const syncCommand = `${CONSTANTS.CLI.SYNC_COMMAND_PREFIX} -p ${
      payload.payload.path
    }\n`;
    this.cliEvents.on(CONSTANTS.CLI.SYNC_PROGRESS_STATE, data => {
      payload.liveMessageHandler(data["status"], data["progress"]);
    });
    return this.awaitCliEvent(CONSTANTS.CLI.SYNC_COMPLETE_STATE, syncCommand);
  }

  public async getFrameworks(projectType: string): Promise<any> {
    const getFrameworksCommand = `${
      CONSTANTS.CLI.GET_FRAMEWORKS_COMMAND_PREFIX
    } -p ${projectType}\n`;
    return this.awaitCliEvent(
      CONSTANTS.CLI.GET_FRAMEWORKS_COMPLETE_STATE,
      getFrameworksCommand
    );
  }

  public getTemplateConfig(): any {
    return CoreTemplateStudio._templateConfig;
  }

  public async getPages(
    projectType: string,
    frontendFramework: string,
    backendFramework: string
  ): Promise<any> {
    const getPagesCommand = `${
      CONSTANTS.CLI.GET_PAGES_COMMAND_PREFIX
    } -p ${projectType} -f ${frontendFramework} -b ${backendFramework}\n`;
    return this.awaitCliEvent(
      CONSTANTS.CLI.GET_PAGES_COMPLETE_STATE,
      getPagesCommand
    );
  }

  public async getAllLicenses(payload: ICommandPayload): Promise<any> {
    const typedPayload = payload.payload as IGenerationPayloadType;
    const getAllLicensesPayload = JSON.stringify(
      this.makeEngineGenerationPayload(typedPayload)
    );
    const getAllLicensesCommand = `${
      CONSTANTS.CLI.GET_ALL_LICENSES_COMMAND_PREFIX
    } -d ${getAllLicensesPayload}\n`;

    return this.awaitCliEvent(
      CONSTANTS.CLI.GET_ALL_LICENSES_COMPLETE_STATE,
      getAllLicensesCommand
    );
  }

  public async getFeatures(
    projectType: string,
    frontendFramework: string,
    backendFramework: string
  ): Promise<any> {
    // to use this in client
    const getFeaturesCommand = `${
      CONSTANTS.CLI.GET_FEATURES_COMMAND_PREFIX
    } -p ${projectType} -f ${frontendFramework} -b ${backendFramework}\n`;
    return this.awaitCliEvent(
      CONSTANTS.CLI.GET_FEATURES_COMPLETE_STATE,
      getFeaturesCommand
    );
  }

  public async getProjectTypes(): Promise<any> {
    // to use this in client
    const getProjectTypesCommand = `${
      CONSTANTS.CLI.GET_PROJECT_TYPES_COMMAND_PREFIX
    }\n`;
    return this.awaitCliEvent(
      CONSTANTS.CLI.GET_PROJECT_TYPES_COMPLETE_STATE,
      getProjectTypesCommand
    );
  }

  public async generate(payload: ICommandPayload): Promise<any> {
    const typedPayload = payload.payload as IGenerationPayloadType;
    const generatePayload = JSON.stringify(
      this.makeEngineGenerationPayload(typedPayload)
    );
    const generateCommand = `${
      CONSTANTS.CLI.GENERATE_COMMAND_PREFIX
    } -d ${generatePayload}\n`;
    const projectItemsToGenerateCount = 4; // Derived from CoreTS logic
    const itemsToGenerateCount =
      projectItemsToGenerateCount +
      typedPayload.pages.length +
      (typedPayload.services.appService ? 1 : 0) +
      (typedPayload.services.cosmosDB ? 1 : 0)
    let generatedItemsCount = 0;

    this.cliEvents.on(CONSTANTS.CLI.GENERATE_PROGRESS_STATE, data => {
      generatedItemsCount++;
      const percentage = (generatedItemsCount / itemsToGenerateCount) * 100;
      const messageWithProgress = `(${percentage.toFixed(0)}%) ${data}`;
      payload.liveMessageHandler(messageWithProgress);
    });
    return await this.awaitCliEvent(
      CONSTANTS.CLI.GENERATE_COMPLETE_STATE,
      generateCommand
    );
  }

  private makeEngineGenerationPayload(
    payload: IGenerationPayloadType
  ): IEngineGenerationPayloadType {
    const {
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
      features: this.getServiceTemplateInfo(services)
    };
  }

  private getServiceTemplateInfo(services: any): any {
    const servicesInfo = [];
    if(services.appService) {
      servicesInfo.push({
        name: services.appService.siteName, //AppService
        templateid: services.appService.internalName
      })
    }if(services.cosmosDB) {
      servicesInfo.push({
        name: services.cosmosDB.accountName, //Cosmos
        templateid: services.cosmosDB.internalName
      })
    }
    return servicesInfo;
  }

  public stop(): void {
    if (this._processCli) {
      this.killProcess(this._processCli);
    }
  }

  private killProcess(processToKill: ChildProcess): void {
    if (process.platform === CONSTANTS.CLI.WINDOWS_PLATFORM_VERSION) {
      const pid = processToKill.pid;
      const spawn = require("child_process").spawn;
      spawn("taskkill", ["/pid", pid, "/f", "/t"]);
    } else {
      processToKill.kill("SIGKILL");
    }
  }
}
