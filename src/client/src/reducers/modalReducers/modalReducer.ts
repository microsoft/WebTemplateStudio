import * as Actions from "../../actions/types";
import { AZURE_TYPEKEYS } from "../../actions/azureActions/typeKeys";

const openModal = (state = null, action: any) => {
  switch (action.type) {
    case Actions.OPEN_MODAL:
      return action.payload;
    case AZURE_TYPEKEYS.SAVE_AZURE_FUNCTIONS_SETTINGS:
    case AZURE_TYPEKEYS.SAVE_COSMOS_DB_RESOURCE_SETTINGS:
    case Actions.CLOSE_MODALS:
      return null;
    default:
      return state;
  }
};

export { openModal };
