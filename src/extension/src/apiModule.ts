import * as vscode from "vscode";
import * as path from "path";
import { ChildProcess, exec } from "child_process";
import { CONSTANTS, SyncStatus } from "./constants";
import * as signalR from "@aspnet/signalr";

export default class ApiModule {
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

    await connection.start().catch((error: Error) => console.log(error));

    postConnectionHandler(connection, payload);

    return connection;
  }

  private static async postSyncConnectionHandler(
    connection: signalR.HubConnection,
    payload: any
  ) {
    connection.on("syncMessage", payload!.listener);

    await connection
      .invoke("SyncTemplates", "Web", payload!.path, "Any")
      .then((obj: any) => console.log(obj))
      .catch((error: Error) => {
        console.log(error);
      });

    connection.stop();
  }

  private static async postGenerateConnectionHandler(
    connection: signalR.HubConnection,
    payload: any
  ) {
    connection.on("genMessage", payload!.listener);
    await connection
      .invoke("Generate", payload!.body)
      .then((obj: any) => console.log(obj));

    connection.stop();
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

    return await this.createSignalRConnection(
      port,
      {
        body: body,
        listener: (message: any) => {
          console.log(message);
        }
      },
      this.postGenerateConnectionHandler
    );
  }
}
