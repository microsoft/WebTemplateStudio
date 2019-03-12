import fetch, { Response } from "node-fetch";
import * as constants from "./constants";

// This path is going to be used by the engine to pull the templates
// it will use to generate the output files
const templatesFolderPath = "../..";

export default class EngineAPIService {
  private API: string;

  constructor(port: string, url: string | undefined) {
    if (url === undefined) {
      this.API = "http://localhost:" + port;
    } else {
      this.API = url + ":" + port;
    }
  }

  public async getProjectTypes(): Promise<any> {
    const url = new URL(constants.API.Endpoints.ProjectType, this.API);
    return await fetch(url.href, { method: constants.API.Methods.GET })
      .then((response: Response) => {
        return response.json();
      })
      .catch((error: Error) => {
        throw Error("request failed:" + error.toString());
      });
  }

  public async getFrameworks(projectType: string): Promise<any> {
    const url = new URL(constants.API.Endpoints.Framework, this.API);
    url.searchParams.append(constants.API.QueryParams.ProjectType, projectType);

    return await fetch(url.href, { method: constants.API.Methods.GET })
      .then((response: Response) => {
        return response.json();
      })
      .catch((error: Error) => {
        throw Error("request failed:" + error.toString());
      });
  }

  public async syncPlatforms(): Promise<any> {
    const url = new URL(constants.API.Endpoints.Sync, this.API);
    const platform = "Web";
    url.searchParams.append(constants.API.QueryParams.Platform, platform);
    url.searchParams.append(
      constants.API.QueryParams.Path,
      templatesFolderPath
    );
    return await fetch(url.href, { method: constants.API.Methods.POST })
      .then((response: Response) => {
        return response.json();
      })
      .catch((error: Error) => {
        throw Error("request failed:" + error.toString());
      });
  }

  public async getFeatures(frameworks: [string]): Promise<any> {
    const url = new URL(constants.API.Endpoints.Feature, this.API);
    frameworks.forEach(framework => {
      url.searchParams.append(constants.API.QueryParams.Framework, framework);
    });
    return await fetch(url.href, { method: constants.API.Methods.GET })
      .then((response: Response) => {
        return response.json();
      })
      .catch((error: Error) => {
        throw Error("request failed:" + error.toString());
      });
  }

  public async getPages(frameworks: [string]): Promise<any> {
    const url = new URL(constants.API.Endpoints.Page, this.API);
    frameworks.forEach(framework => {
      url.searchParams.append(constants.API.QueryParams.Framework, framework);
    });
    return await fetch(url.href, { method: constants.API.Methods.GET })
      .then((response: Response) => {
        return response.json();
      })
      .catch((error: Error) => {
        throw Error("request failed:" + error.toString());
      });
  }
}
