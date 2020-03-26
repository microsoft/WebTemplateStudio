import { AZURE_TYPEKEYS } from "../typeKeys";
import { IAvailabilityFromExtension } from "../azure/model";
import { FormattedMessage } from "react-intl";

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

export interface IAvailabilityCosmosDbReducer {
  isAccountNameAvailable: boolean;
  message: string;
}

export interface IServiceContent {
  serviceType: FormattedMessage.MessageDescriptor;
}

export interface ISelectedCosmosServiceReducer {
  subscription: string;
  resourceGroup: string;
  accountName: string;
  api: string;
  internalName: string;
}

export interface ICosmosDBReducer {
  accountNameAvailability: IAvailabilityCosmosDbReducer;
  selection: ISelectedCosmosServiceReducer[];
  wizardContent: IServiceContent;
}