import fetch, { Response } from "node-fetch";
import * as signalR from "@aspnet/signalr";
import * as portfinder from "portfinder";
import * as vscode from "vscode";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

import { ChildProcess, execFile } from "child_process";
import { CONSTANTS } from "./CONSTANTS";
import { GenerateCommand } from "./signalr-api-module/generateCommand";
import { SyncCommand } from "./signalr-api-module/syncCommand";
import { ICommandPayload } from "./signalr-api-module/commandPayload";

/**
 * An interface for CoreTS. It should be transparent to the communication
 * channel(s) between WebTS and CoreTS.
 */
export class CoreTemplateStudio {
  private static _instance: CoreTemplateStudio | undefined;

  private _signalRClient: signalR.HubConnection | undefined;
  private _process: ChildProcess;
  private _port: number;
  private _url: string;

  public static GetExistingInstance(): CoreTemplateStudio {
    if (CoreTemplateStudio._instance) {
      return CoreTemplateStudio._instance;
    }

    throw new Error('Cannot GetExistingInstance as none has been created');
  }

  public static async GetInstance(
    context: vscode.ExtensionContext | undefined
  ): Promise<CoreTemplateStudio> {
    if (CoreTemplateStudio._instance) {
      return Promise.resolve(CoreTemplateStudio._instance);
    }

    let platform = process.platform;
    let executableName = CONSTANTS.API.BASE_APPLICATION_NAME;
    let extensionPath;

    if (context) {
      extensionPath = context.extensionPath;
    } else {
      extensionPath = path.join(__dirname, '..');
    }

    if (platform === CONSTANTS.API.WINDOWS_PLATFORM_VERSION) {
      executableName += ".exe";
    }

    let apiPath = vscode.Uri.file(
      path.join(extensionPath, "src", "api", platform, executableName)
    ).fsPath;

    let apiWorkingDirectory = path.join(
      extensionPath,
      "src",
      "api",
      platform
    );

    if (os.platform() !== CONSTANTS.API.WINDOWS_PLATFORM_VERSION) {
      // Not unsafe as the parameter comes from trusted source
      // tslint:disable-next-line:non-literal-fs-path
      fs.chmodSync(apiPath, 0o755);
    }

    const port = await portfinder.getPortPromise({
      port: CONSTANTS.START_PORT
    });

    let spawnedProcess = execFile(
      `${apiPath}`,
      [ `--urls=http://localhost:${port}` ],
      { cwd: apiWorkingDirectory }
    );

    CoreTemplateStudio._instance = new CoreTemplateStudio(spawnedProcess, port, `http://localhost:${port}`);
    return CoreTemplateStudio._instance;
  }

  public static DestroyInstance() {
    if (CoreTemplateStudio._instance) {
      CoreTemplateStudio._instance.stop();
      CoreTemplateStudio._instance = undefined;
    }
  }

  private constructor(
    process: ChildProcess,
    port: number,
    url: string
  ) {
    this._process = process;
    this._port = port;
    this._url = url;
  }

  public getPort(): number {
    return this._port;
  }

  public async getProjectTypes(): Promise<any> {
    // TODO: use this in client instead of fetching directly from API server
    const url = new URL(CONSTANTS.API.ENDPOINTS.PROJECT_TYPE, this._url);
    return await fetch(url.href, { method: CONSTANTS.API.METHODS.GET })
      .then((response: Response) => {
        return response.json();
      })
      .catch((error: Error) => {
        throw Error(error.toString());
      });
  }

  public async getFrameworks(projectType: string): Promise<any> {
    // TODO: use this in client instead of fetching directly from API server
    const url = new URL(CONSTANTS.API.ENDPOINTS.FRAMEWORK, this._url);
    url.searchParams.append(CONSTANTS.API.QUERY_PARAMS.PROJECT_TYPE, projectType);

    return await fetch(url.href, { method: CONSTANTS.API.METHODS.GET })
      .then((response: Response) => {
        return response.json();
      })
      .catch((error: Error) => {
        throw Error(error.toString());
      });
  }

  public async getFeatures(
    projectType: string,
    frontendFramework: string,
    backendFramework: string
  ): Promise<any> {
    // TODO: use this in client instead of fetching directly from API server
    const url = new URL(CONSTANTS.API.ENDPOINTS.FEATURE, this._url);
    url.searchParams.append(CONSTANTS.API.QUERY_PARAMS.PROJECT_TYPE, projectType);
    url.searchParams.append(
      CONSTANTS.API.QUERY_PARAMS.FRONTEND_FRAMEWORK,
      frontendFramework
    );
    url.searchParams.append(
      CONSTANTS.API.QUERY_PARAMS.BACKEND_FRAMEWORK,
      backendFramework
    );
    return await fetch(url.href, { method: CONSTANTS.API.METHODS.GET })
      .then((response: Response) => {
        return response.json();
      })
      .catch((error: Error) => {
        throw Error(error.toString());
      });
  }

  public async getPages(
    projectType: string,
    frontendFramework: string,
    backendFramework: string
  ): Promise<any> {
    // TODO: use this in client instead of fetching directly from API server
    const url = new URL(CONSTANTS.API.ENDPOINTS.PAGE, this._url);
    url.searchParams.append(CONSTANTS.API.QUERY_PARAMS.PROJECT_TYPE, projectType);
    url.searchParams.append(
      CONSTANTS.API.QUERY_PARAMS.FRONTEND_FRAMEWORK,
      frontendFramework
    );
    url.searchParams.append(
      CONSTANTS.API.QUERY_PARAMS.BACKEND_FRAMEWORK,
      backendFramework
    );

    return await fetch(url.href, { method: CONSTANTS.API.METHODS.GET })
      .then((response: Response) => {
        return response.json();
      })
      .catch((error: Error) => {
        throw Error(error.toString());
      });
  }

  public async sync(payload: ICommandPayload): Promise<any> {
    let connection = await this.connectToCoreApiHub();
    let command = new SyncCommand(payload);
    return await command.execute(connection);
  }

  public async generate(payload: ICommandPayload): Promise<any> {
    let connection = await this.connectToCoreApiHub();
    let command = new GenerateCommand(payload);
    return await command.execute(connection);
  }

  public stop() {
    if (this._process) {
      this.killProcess(this._process);
    }
  }

  private killProcess(processToKill: ChildProcess) {
    if (process.platform === CONSTANTS.API.WINDOWS_PLATFORM_VERSION) {
      let pid = processToKill.pid;
      let spawn = require("child_process").spawn;
      spawn("taskkill", ["/pid", pid, "/f", "/t"]);
    } else {
      processToKill.kill("SIGKILL");
    }
  }

  private async connectToCoreApiHub(): Promise<signalR.HubConnection> {
    // Reusing connections we can save some time on handshake overhead
    if (this._signalRClient && this._signalRClient.state === signalR.HubConnectionState.Connected) {
      return this._signalRClient;
    }

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${this._url}/corehub`)
      .build();

    await connection.start().catch((error: Error) => console.log(error));
    this._signalRClient = connection;
    return connection;
  }
}
