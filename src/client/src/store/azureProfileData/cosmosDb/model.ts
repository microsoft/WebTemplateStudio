import { AZURE_TYPEKEYS } from "../typeKeys";
import { IAvailabilityFromExtensionAction } from "../azure/model";
import { FormattedMessage } from "react-intl";

export interface ISaveCosmosDbSettingsAction {
  type: AZURE_TYPEKEYS.SAVE_COSMOS_DB_RESOURCE_SETTINGS;
  payload: ISelectedCosmosService;
}

export interface IRemoveCosmosDbSettingsAction {
  type: AZURE_TYPEKEYS.REMOVE_COSMOS_RESOURCE;
  payload: number;
}

export interface ISetCosmosAccountNameAvailabilityAction {
  type: AZURE_TYPEKEYS.SET_ACCOUNT_AVAILABILITY;
  payload: IAvailabilityFromExtensionAction;
}

interface IAvailabilityCosmosDb {
  isAccountNameAvailable: boolean;
  message: string;
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
  accountNameAvailability: IAvailabilityCosmosDb;
  selection: ISelectedCosmosService | null;
}