import { API } from "../azure/azure-cosmosDB/cosmosDbModule";

export interface IGenerationData {
  backendFramework: string;
  frontendFramework: string;
  backendFrameworkLinuxVersion: string;
  pages: any;
  path: string;
  projectName: string;
  projectType: string;
  services: Array<IService>;
}

export type IService = IAppService|ICosmosDB|IDefaultService;

export type IBaseService = {
  internalName: string;
  serviceName: string;
  category: SERVICE_CATEGORY;
  type: SERVICE_TYPE;
};

//This interface is for services without azure generation (code generation only by cli)
export interface IDefaultService extends IBaseService {
  category: SERVICE_CATEGORY.DEFAULT;
  type: SERVICE_TYPE.DEFAULT;
}

export interface IAzureService extends IBaseService{
  category: SERVICE_CATEGORY.AZURE;
  subscription: string;
  resourceGroup: string;
  location: string;
}

export interface IAppService extends IAzureService {
  type: SERVICE_TYPE.APPSERVICE;
}

export interface ICosmosDB extends IAzureService{
  type: SERVICE_TYPE.COSMOSDB;
  api: API;
}


export enum SERVICE_CATEGORY {
  DEFAULT = "default",
  AZURE = "azure"
}

export enum SERVICE_TYPE {
  DEFAULT = "default",
  APPSERVICE = "appService",
  COSMOSDB = "cosmosDB"
}
