import { ISaveCosmosDbSettings, IRemoveCosmosDbSettings, ISetCosmosAccountNameAvailability } from "./model";
import { AZURE_TYPEKEYS } from "../typeKeys";
import { IAvailabilityFromExtension } from "../azure/model";

export const saveCosmosDbSettingsAction = (
  cosmosDbSettings: any
): ISaveCosmosDbSettings => ({
  type: AZURE_TYPEKEYS.SAVE_COSMOS_DB_RESOURCE_SETTINGS,
  payload: cosmosDbSettings
});

export const removeCosmosSelectionAction = (
  selectionIndex: number
): IRemoveCosmosDbSettings => ({
  type: AZURE_TYPEKEYS.REMOVE_COSMOS_RESOURCE,
  payload: selectionIndex
});

export const setAccountAvailability = (
  isAccountAvailableObject: IAvailabilityFromExtension
): ISetCosmosAccountNameAvailability => ({
  type: AZURE_TYPEKEYS.SET_ACCOUNT_AVAILABILITY,
  payload: isAccountAvailableObject
});