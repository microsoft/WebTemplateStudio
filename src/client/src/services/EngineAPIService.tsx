const fetch = require('node-fetch');

const API = "http://localhost:";

export class EngineAPIService {
    port: string;
    constructor(port: string){
        this.port = port;
    }
    get_project_types(){
        return fetch(API + this.port + "/api/projectType")
      .then(response => response.json()).catch(error => {});
    }
    get_all_frameworks(projectType: string){
        return fetch(API + this.port + "/api/framework?projectType=" + projectType)
        .then(response => response.json()).catch(error => {});
    }

    get_frontend_frameworks(projectType: string){
        return fetch(API + this.port + "/api/framework/frontend?projectType=" + projectType)
        .then(response => response.json()).catch(error => {});
    }

    get_backend_frameworks(projectType: string){
        return fetch(API + this.port + "/api/framework/backend?projectType=" + projectType)
        .then(response => response.json()).catch(error => {});
    }
} 
