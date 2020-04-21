import { ISaveCosmosDbAction, IRemoveCosmosDbAction, ICosmosDB } from "./model";
import { SERVICES_TYPEKEYS } from "../typeKeys";

export const saveCosmosDbAction = (cosmosDb: ICosmosDB): ISaveCosmosDbAction => ({
  type: SERVICES_TYPEKEYS.SAVE_COSMOS_DB,
  payload: cosmosDb,
});

export const removeCosmosDbAction = (): IRemoveCosmosDbAction => ({
  type: SERVICES_TYPEKEYS.REMOVE_COSMOS_DB,
});
