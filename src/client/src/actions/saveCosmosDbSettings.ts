import * as Actions from "./types";

const saveCosmosDbSettingsAction = (cosmosDbSettings: any) => ({
  type: Actions.SAVE_COSMOS_DB_RESOURCE_SETTINGS,
  payload: cosmosDbSettings
});

const removeCosmosSelectionAction = (selectionIndex: number) => ({
  type: Actions.REMOVE_COSMOS_RESOURCE,
  payload: selectionIndex
})

export { saveCosmosDbSettingsAction, removeCosmosSelectionAction };
