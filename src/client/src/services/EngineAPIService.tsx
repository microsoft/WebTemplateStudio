import fetch, { Response } from "node-fetch";
import * as constants from "./constants";

// This path is going to be used by the engine to pull the templates
// it will use to generate the output files
const templatesFolderPath = "../";

export class EngineAPIService {

    private API: string;

    constructor(port: string, url: string | undefined) {
        if (url === undefined) {
            this.API = "http://localhost" + port;
        } else {
            this.API = url + ":" + port;
        }
    }

    public async getProjectTypes(): Promise<Response | JSON> {
        const url = new URL(constants.API.Endpoints.ProjectType, this.API);
        return await fetch(url.href, { method: constants.API.Methods.GET })
            .then((response: Response) => {
                return response.json();
            })
            .catch((error: Error) => {
                throw Error("request failed:" + error.toString());
            });
    }

    public async getFrameworks(): Promise<Response | JSON> {
        const url = new URL(constants.API.Endpoints.Framework, this.API);
        return await fetch(url.href, { method: constants.API.Methods.GET })
            .then((response: Response) => {
                return response;
            })
            .catch((error: Error) => {
                throw Error("request failed:" + error.toString());
            });
    }

    public async syncPlatforms(platform: string): Promise<Response | JSON> {
        const url = new URL(constants.API.Endpoints.Sync, this.API);
        url.searchParams.append(constants.API.QueryParams.Platform, platform);
        url.searchParams.append(constants.API.QueryParams.Path, templatesFolderPath);
        return await fetch(url.href, { method: constants.API.Methods.POST })
            .then((response: Response) => {
                return response.json();
            })
            .catch((error: Error) => {
                throw Error("request failed:" + error.toString());
            });
    }

    public async getFeatures(frameworks: [string]): Promise<Response | JSON> {
        const url = new URL(constants.API.Endpoints.Feature, this.API);
        frameworks.forEach((framework) => {
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

    public async getPages(frameworks: [string]): Promise<Response | JSON> {
        const url = new URL(constants.API.Endpoints.Page, this.API);
        frameworks.forEach((framework) => {
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
