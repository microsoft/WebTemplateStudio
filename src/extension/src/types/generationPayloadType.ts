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

export type IService = IDefaultService|IAzureService;

export interface IBaseService {
  internalName: string;
  type: SERVICE_TYPEKEYS;
}

export interface IDefaultService extends IBaseService {
  type: SERVICE_TYPEKEYS.DEFAULT;
}

export interface IAzureService extends IBaseService{
  type: SERVICE_TYPEKEYS.AZURE;
  azureType: AZURE_SERVICE_TYPEKEYS;
  subscription: string;
  resourceGroup: string;
  location: string;
}

export interface IAppService extends IAzureService {
  azureType: AZURE_SERVICE_TYPEKEYS.APPSERVICE;
  siteName: string;
}

export interface ICosmosDB extends IAzureService{
  azureType: AZURE_SERVICE_TYPEKEYS.COSMOSDB;
  accountName: string;
  api: API;
}


export enum SERVICE_TYPEKEYS {
  DEFAULT = "Default",
  AZURE = "Azure"
}

export enum AZURE_SERVICE_TYPEKEYS {
  APPSERVICE = "AppService",
  COSMOSDB = "CosmosDB"
}