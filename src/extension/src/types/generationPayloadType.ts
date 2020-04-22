import { API } from "../azure/azure-cosmosDB/cosmosDbModule";

export interface IGenerationPayloadType {
  backendFramework: string;
  frontendFramework: string;
  backendFrameworkLinuxVersion: string;
  pages: any;
  path: string;
  projectName: string;
  projectType: string;
  services: IServicesGenerationPayload;
}

export interface IServicesGenerationPayload {
  appService: IAppServiceGenerationPayload | null;
  cosmosDB: ICosmosDBGenerationPayload | null;
}

export interface IAppServiceGenerationPayload {
  subscription: string;
  resourceGroup: string;
  location: string;
  siteName: string;
  internalName: string;
}

export interface ICosmosDBGenerationPayload {
  subscription: string;
  resourceGroup: string;
  location: string;
  accountName: string;
  api: API;
  internalName: string;
}