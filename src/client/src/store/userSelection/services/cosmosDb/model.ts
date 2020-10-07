import { SERVICES_TYPEKEYS } from "../typeKeys";

export interface ISaveCosmosDbAction {
  type: SERVICES_TYPEKEYS.SAVE_COSMOS_DB;
  payload: ICosmosDB;
}

export interface IRemoveCosmosDbAction {
  type: SERVICES_TYPEKEYS.REMOVE_COSMOS_DB;
}

export interface ICosmosDB {
  subscription: string;
  resourceGroup: string;
  location: string;
  accountName: string;
  api: string;
  internalName: string;
  icon: string;
  groupName: string;
  editable?: boolean;
}
