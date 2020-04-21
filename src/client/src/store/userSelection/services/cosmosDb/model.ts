import { AZURE_TYPEKEYS } from "../../../azureProfileData/typeKeys";

export interface ISaveCosmosDbSettingsAction {
  type: AZURE_TYPEKEYS.SAVE_COSMOS_DB_RESOURCE_SETTINGS;
  payload: ISelectedCosmosService;
}

export interface IRemoveCosmosDbSettingsAction {
  type: AZURE_TYPEKEYS.REMOVE_COSMOS_RESOURCE;
  payload: number;
}

export interface ISelectedCosmosService {
  subscription: string;
  resourceGroup: string;
  location: string;
  accountName: string;
  api: string;
  internalName: string;
}

export interface ICosmosDB {
  selection: ISelectedCosmosService | null;
}