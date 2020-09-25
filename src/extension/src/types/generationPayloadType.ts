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
  category: SERVICE_CATEGORY;
  type: SERVICE_TYPE;
};

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
  siteName: string;
}

export interface ICosmosDB extends IAzureService{
  type: SERVICE_TYPE.COSMOSDB;
  accountName: string;
  api: API;
}


export enum SERVICE_CATEGORY {
  DEFAULT = "Default",
  AZURE = "Azure"
}

export enum SERVICE_TYPE {
  DEFAULT = "Default",
  APPSERVICE = "AppService",
  COSMOSDB = "CosmosDB"
}
