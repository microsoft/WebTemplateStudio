import { ISaveCosmosDbSettingsAction, IRemoveCosmosDbSettingsAction } from "./model";
import { AZURE_TYPEKEYS } from "../typeKeys";

export const saveCosmosDbSettingsAction = (
  cosmosDbSettings: any
): ISaveCosmosDbSettingsAction => ({
  type: AZURE_TYPEKEYS.SAVE_COSMOS_DB_RESOURCE_SETTINGS,
  payload: cosmosDbSettings
});

export const removeCosmosSelectionAction = (
  selectionIndex: number
): IRemoveCosmosDbSettingsAction => ({
  type: AZURE_TYPEKEYS.REMOVE_COSMOS_RESOURCE,
  payload: selectionIndex
});