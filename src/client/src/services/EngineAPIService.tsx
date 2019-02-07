import fetch from "node-fetch";

export class EngineAPIService {

    private API: string;

    constructor(port: string, host: string | undefined) {
        if (!undefined) {
            this.API = "http://localhost:" + port;
        } else {
            this.API = host + ":" + port;
        }
    }

    public async getProjectTypes(platform: string, language: string) {
        const url = new URLSearchParams(this.API + "/api/projectType");
        url.append("platform", platform);
        url.append("language", language);
        fetch(url.toString(), { method: "get" })
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return {};
                }

            })
            .catch((error: Error) => {
                return {};
            });
    }

    public async getFrameworks(projectType: string) {
        const url = new URLSearchParams(this.API + "/api/framework");
        url.append("projectType", projectType);
        fetch(url.toString(), { method: "get" })
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return {};
                }

            })
            .catch((error: Error) => {
                return {};
            });
    }

    public async syncPlatforms(platform: string) {
        throw Error("Undefined function");
    }

    public async getFeatures(frameworks: [string]) {
        const url = new URLSearchParams(this.API + "/api/feature");
        frameworks.forEach((framework) => {
            url.append("framework", framework);
        });
        fetch(url.toString(), { method: "get" })
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return {};
                }

            }).catch((error: Error) => {
                return {};
            });
    }

    public async getPages(frameworks: [string]) {
        const url = new URLSearchParams(this.API + "/api/page");
        frameworks.forEach((framework) => {
            url.append("framework", framework);
        });
        fetch(url.toString(), { method: "get" })
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return {};
                }

            })
            .catch((error: Error) => {
                return {};
            });
    }
}
