import * as vscode from "vscode";
import * as path from "path";
import { ChildProcess, exec } from "child_process";
import { CONSTANTS, SyncStatus } from "./constants";
import * as signalR from "@aspnet/signalr";

export default class ApiModule {
  private static readonly GenerateEndpoint = CONSTANTS.GENERATE_ENDPOINT;

  public static StartApi(context: vscode.ExtensionContext): ChildProcess {
    let platform = process.platform;

    let executableName = CONSTANTS.API.BASE_APPLICATION_NAME;

    if (platform === CONSTANTS.API.WINDOWS_PLATFORM_VERSION) {
      executableName += ".exe";
    }

    let apiPath = vscode.Uri.file(
      path.join(context.extensionPath, "src", "api", platform, executableName)
    ).fsPath;

    let apiWorkingDirectory = path.join(
      context.extensionPath,
      "src",
      "api",
      platform
    );
    let spawnedProcess = exec(`${apiPath}`, { cwd: apiWorkingDirectory });

    return spawnedProcess;
  }

  public static async SendSyncRequestToApi(
    port: string,
    path: string,
    statusHandler: (status: SyncStatus) => any
  ) {
    await this.createSignalRConnection(
      port,
      { path: path, listener: statusHandler },
      this.postSyncConnectionHandler
    );
  }

  private static async createSignalRConnection(
    port: string,
    payload: any,
    postConnectionHandler: (
      connection: signalR.HubConnection,
      payload: any
    ) => {}
  ): Promise<signalR.HubConnection> {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:${port}/corehub`)
      .build();

    await connection.start().catch(error => console.log(error));

    postConnectionHandler(connection, payload);

    return connection;
  }

  private static async postSyncConnectionHandler(
    connection: signalR.HubConnection,
    payload: any
  ) {
    connection.on("syncMessage", payload!.listener);

    connection
      .invoke("SyncTemplates", "Web", payload!.path, "Any")
      .then(obj => console.log(obj))
      .catch(error => {
        console.log(error);
      });
  }

  /**
   * This method will send a post request to the generation end point in the engine's api, to generate a project
   * with the information provided.
   * @param port The port of the api
   * @param payload The template generation payload for the post request that is to be sent to the engine api for generation.
   */
  public static async SendTemplateGenerationPayloadToApi(
    port: string,
    payload: IGenerationPayloadType
  ): Promise<any> {
    let host = "http://localhost:" + port;
    const url = new URL(this.GenerateEndpoint, host);
    let body = {
      projectName: payload.projectName,
      genPath: payload.path,
      projectType: payload.projectType,
      frontendFramework: payload.frontendFramework,
      backendFramework: payload.backendFramework,
      language: "Any",
      platform: "Web",
      homeName: "Test",
      pages: payload.pages.map((page: any) => ({
        name: page.name,
        templateid: page.identity
      })),
      features: payload.services.map((service: any) => ({
        name: service.name,
        templateid: service.identity
      }))
    };

    return await fetch(url.href, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then((response: Response) => {
        return response;
      })
      .catch((error: Error) => {
        throw Error("request failed:" + error.toString());
      });
  }
}
