import fetch from "node-fetch";

const API = "http://localhost:";

export class EngineAPIService {
    private port: string;

    constructor(port: string) {
        this.port = port;
    }

    public async getProjectTypes() {
        return fetch(API + this.port + "/api/projectType")
            .then((response) => response.json())
            .catch((error: Error) => {
                return {};
            });
    }

    public async getAllFrameworks(projectType: string) {
        return fetch(API + this.port + "/api/framework?projectType=" + projectType)
            .then((response) => response.json())
            .catch((error: Error) => {
                return {};
            });
    }

    public async getFrontendFrameworks(projectType: string) {
        return fetch(API + this.port + "/api/framework/frontend?projectType=" + projectType)
            .then((response) => response.json())
            .catch((error: Error) => {
                return {};
            });
    }

    public async getBackendFrameworks(projectType: string) {
        return fetch(API + this.port + "/api/framework/backend?projectType=" + projectType)
            .then((response) => response.json())
            .catch((error: Error) => {
                return {};
            });
    }
}
