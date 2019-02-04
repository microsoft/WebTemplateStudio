import fetch from 'node-fetch';

const API = "http://localhost:";

export class EngineAPIService {
    _port: string;

    constructor(port: string) {
        this._port = port;
    }

    async getProjectTypes() {
        return fetch(API + this._port + "/api/projectType")
            .then((response) => { return response.json() })
            .catch((error: Error) => {
                return {}
            });
    }

    async getAllFrameworks(projectType: string) {
        return fetch(API + this._port + "/api/framework?projectType=" + projectType)
            .then((response) => { return response.json() })
            .catch((error: Error) => {
                return {}
            });
    }

    async getFrontendFrameworks(projectType: string) {
        return fetch(API + this._port + "/api/framework/frontend?projectType=" + projectType)
            .then((response) => { return response.json() })
            .catch((error: Error) => {
                return {}
            });
    }

    async getBackendFrameworks(projectType: string) {
        return fetch(API + this._port + "/api/framework/backend?projectType=" + projectType)
            .then((response) => { return response.json() })
            .catch((error: Error) => {
                return {}
            });
    }
} 
