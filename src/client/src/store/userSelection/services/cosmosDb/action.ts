import { SERVICES_TYPEKEYS } from "../typeKeys";
import { ICosmosDB, IRemoveCosmosDbAction, ISaveCosmosDbAction } from "./model";

export const saveCosmosDbAction = (cosmosDb: ICosmosDB): ISaveCosmosDbAction => ({
  type: SERVICES_TYPEKEYS.SAVE_COSMOS_DB,
  payload: cosmosDb,
});

export const removeCosmosDbAction = (): IRemoveCosmosDbAction => ({
  type: SERVICES_TYPEKEYS.REMOVE_COSMOS_DB,
});
