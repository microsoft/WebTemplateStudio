import { ISaveCosmosDbAction, IRemoveCosmosDbAction, ISelectedCosmosService } from "./model";
import { AZURE_TYPEKEYS } from "../../../azureProfileData/typeKeys";

export const saveCosmosDbAction = (cosmosDb: ISelectedCosmosService): ISaveCosmosDbAction => ({
  type: AZURE_TYPEKEYS.SAVE_COSMOS_DB,
  payload: cosmosDb,
});

export const removeCosmosDbAction = (): IRemoveCosmosDbAction => ({
  type: AZURE_TYPEKEYS.REMOVE_COSMOS_DB,
});
