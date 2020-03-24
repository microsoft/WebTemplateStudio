import { AZURE_TYPEKEYS } from "../typeKeys";
import { IAvailabilityFromExtension } from "../azure/model";

export interface ISaveCosmosDbSettings {
  type: AZURE_TYPEKEYS.SAVE_COSMOS_DB_RESOURCE_SETTINGS;
  payload: any;
}

export interface IRemoveCosmosDbSettings {
  type: AZURE_TYPEKEYS.REMOVE_COSMOS_RESOURCE;
  payload: number;
}

export interface ISetCosmosAccountNameAvailability {
  type: AZURE_TYPEKEYS.SET_ACCOUNT_AVAILABILITY;
  payload: IAvailabilityFromExtension;
}
