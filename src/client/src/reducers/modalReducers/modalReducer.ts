import { AZURE_TYPEKEYS } from "../../actions/azureActions/typeKeys";
import { MODAL_TYPEKEYS } from "../../actions/modalActions/typeKeys";
import { AnyAction } from "redux";
import { RESET_WIZARD } from "../../actions/resetWizardAction";

const openModal = (state = null, action: AnyAction) => {
  switch (action.type) {
    case MODAL_TYPEKEYS.OPEN_MODAL:
      return action.payload;
    case AZURE_TYPEKEYS.SAVE_AZURE_FUNCTIONS_SETTINGS:
    case AZURE_TYPEKEYS.SAVE_COSMOS_DB_RESOURCE_SETTINGS:
    case MODAL_TYPEKEYS.CLOSE_MODALS:
    case RESET_WIZARD:
      return null;
    default:
      return state;
  }
};

export { openModal };
