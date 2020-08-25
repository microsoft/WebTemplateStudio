import { AZURE_TYPEKEYS } from "../../../config/azure/typeKeys";
import RootAction from "../../../ActionType";
import { SERVICES_TYPEKEYS } from "../typeKeys";
import { ICosmosDB } from "./model";

const initialState: ICosmosDB | null = null;

const services = (state: ICosmosDB | null = initialState, action: RootAction) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.LOG_OUT_OF_AZURE:
    case SERVICES_TYPEKEYS.REMOVE_COSMOS_DB:
      return initialState;
    case SERVICES_TYPEKEYS.SAVE_COSMOS_DB:
      return {
        subscription: action.payload.subscription,
        resourceGroup: action.payload.resourceGroup,
        location: action.payload.location,
        api: action.payload.api,
        accountName: action.payload.accountName,
        internalName: action.payload.internalName,
        groupName: action.payload.groupName,
        editable: action.payload.editable
      };
    default:
      return state;
  }
};

export default services;
