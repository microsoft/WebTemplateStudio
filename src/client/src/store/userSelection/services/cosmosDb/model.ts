import { AZURE_TYPEKEYS } from "../../../azureProfileData/typeKeys";

export interface ISaveCosmosDbAction {
  type: AZURE_TYPEKEYS.SAVE_COSMOS_DB;
  payload: ISelectedCosmosService;
}

export interface IRemoveCosmosDbAction {
  type: AZURE_TYPEKEYS.REMOVE_COSMOS_DB;
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
