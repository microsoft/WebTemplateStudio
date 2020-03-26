import { AZURE_TYPEKEYS } from "../typeKeys";
import { IAvailabilityFromExtensionAction } from "../azure/model";
import { FormattedMessage } from "react-intl";

export interface ISaveCosmosDbSettingsAction {
  type: AZURE_TYPEKEYS.SAVE_COSMOS_DB_RESOURCE_SETTINGS;
  payload: any;
}

export interface IRemoveCosmosDbSettingsAction {
  type: AZURE_TYPEKEYS.REMOVE_COSMOS_RESOURCE;
  payload: number;
}

export interface ISetCosmosAccountNameAvailabilityAction {
  type: AZURE_TYPEKEYS.SET_ACCOUNT_AVAILABILITY;
  payload: IAvailabilityFromExtensionAction;
}

export interface IAvailabilityCosmosDbReducer {
  isAccountNameAvailable: boolean;
  message: string;
}

interface IServiceContentReducer {
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
  wizardContent: IServiceContentReducer;
}

export interface ISelectedDropdownsSelector {
  subscription?: IDropDownOptionType;
  resourceGroup?: IDropDownOptionType;
  appName?: IDropDownOptionType;
  runtimeStack?: IDropDownOptionType;
  location?: IDropDownOptionType;
}

export interface ISelectionInformationSelector {
  dropdownSelection: ISelectedDropdownsSelector;
  previousFormData: ISelectedCosmosServiceReducer;
}