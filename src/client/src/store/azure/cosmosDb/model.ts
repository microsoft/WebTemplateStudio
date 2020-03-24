import { AZURE_TYPEKEYS } from "../typeKeys";

export interface ISaveCosmosDbSettings {
  type: AZURE_TYPEKEYS.SAVE_COSMOS_DB_RESOURCE_SETTINGS;
  payload: any;
}

export interface IRemoveCosmosDbSettings {
  type: AZURE_TYPEKEYS.REMOVE_COSMOS_RESOURCE;
  payload: number;
}