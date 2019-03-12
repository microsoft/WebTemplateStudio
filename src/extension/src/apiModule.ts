import * as vscode from "vscode";
import * as path from "path";
import { spawn, ChildProcess } from "child_process";
import fetch, { Response } from "node-fetch";

export default class ApiModule {
  private static readonly GenerateEndpoint = "/api/generate";

  public static StartApi(context: vscode.ExtensionContext): ChildProcess {
    let apiPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src",
        "api",
        "CoreTemplateStudio.Api.dll"
      )
    ).fsPath;

    let apiWorkingDirectory = path.join(context.extensionPath, "src", "api");
    let process = spawn("dotnet", [apiPath], { cwd: apiWorkingDirectory });
    return process;
  }

  public static async SendGeneration(
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
