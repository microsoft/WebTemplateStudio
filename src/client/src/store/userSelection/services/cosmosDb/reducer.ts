import { AZURE_TYPEKEYS } from "../../../azureProfileData/typeKeys";
import AzureActionType from "../../../azureProfileData/azureActionType";
import { ICosmosDB } from "./model";

const initialState: ICosmosDB = {
  selection: null
};

const services = (state: ICosmosDB = initialState, action: AzureActionType) => {
  switch (action.type) {
      case AZURE_TYPEKEYS.LOG_OUT_OF_AZURE:
        case AZURE_TYPEKEYS.REMOVE_COSMOS_RESOURCE:
        return initialState;
    case AZURE_TYPEKEYS.SAVE_COSMOS_DB_RESOURCE_SETTINGS:
      const newUserSelectionState = {
        ...state,
        selection: {
          subscription: action.payload.subscription,
          resourceGroup: action.payload.resourceGroup,
          location: action.payload.location,
          api: action.payload.api,
          accountName: action.payload.accountName,
          internalName: action.payload.internalName
        }
      };
      return newUserSelectionState;
    
    default:
      return state;
  }
};

export default services;
