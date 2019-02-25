import * as Actions from "./types";

const saveCosmosDbSettingsAction = (cosmosDbSettings: any) => ({
  type: Actions.SAVE_COSMOS_DB_RESOURCE_SETTINGS,
  payload: cosmosDbSettings
});

export { saveCosmosDbSettingsAction };
