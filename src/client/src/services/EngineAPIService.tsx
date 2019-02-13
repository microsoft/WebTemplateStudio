import fetch, { Response } from "node-fetch";

// This path is going to be used by the engine to create templates
const templatesFolderPath = "../";

export class EngineAPIService {

    private API: string;

    constructor(port: string, host: string | undefined) {
        if (!undefined) {
            this.API = "http://localhost:" + port;
        } else {
            this.API = host + ":" + port;
        }
    }

    public async getProjectTypes(): Promise<Response | JSON> {
        const url = new URL(this.API + "/api/projectType");
        return await fetch(url.href, { method: "get" })
            .then((response: Response) => {
                return response.json();
            })
            .catch((error: Error) => {
                throw Error("request failed.");
            });
    }

    public async getFrameworks(): Promise<Response | JSON> {
        const url = new URL(this.API + "/api/framework");
        return await fetch(url.href, { method: "get" })
            .then((response: Response) => {
                return response;
            })
            .catch((error: Error) => {
                throw Error("request failed.");
            });
    }

    public async syncPlatforms(platform: string): Promise<Response | JSON> {
        const url = new URL(this.API + "/api/sync");
        url.searchParams.append("platform", platform);
        url.searchParams.append("path", templatesFolderPath);
        return await fetch(url.href, { method: "post" })
            .then((response: Response) => {
                return response.json();
            })
            .catch((error: Error) => {
                throw Error("request failed.");
            });
    }

    public async getFeatures(frameworks: [string]): Promise<Response | JSON> {
        const url = new URL(this.API + "/api/feature");
        frameworks.forEach((framework) => {
            url.searchParams.append("framework", framework);
        });
        return await fetch(url.href, { method: "get" })
            .then((response: Response) => {
                return response.json();
            })
            .catch((error: Error) => {
                throw Error("request failed.");
            });
    }

    public async getPages(frameworks: [string]): Promise<Response | JSON> {
        const url = new URL(this.API + "/api/page");
        frameworks.forEach((framework) => {
            url.searchParams.append("framework", framework);
        });
        return await fetch(url.href, { method: "get" })
            .then((response: Response) => {
                return response.json();
            })
            .catch((error: Error) => {
                throw Error("request failed.");
            });
    }
}
