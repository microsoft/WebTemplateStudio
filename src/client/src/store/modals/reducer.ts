import { AZURE_TYPEKEYS } from "../azureProfileData/typeKeys";
import {
  MODAL_TYPEKEYS,
  ModalState
} from "./typeKeys";
import RootAction from "../ActionType";

const initialState: ModalState = {
  modalType: null,
  modalData: null
};

const openModal = (state: ModalState = initialState, action: RootAction) => {
  switch (action.type) {
    case MODAL_TYPEKEYS.OPEN_MODAL:
      return action.payload;
    case AZURE_TYPEKEYS.SAVE_COSMOS_DB_RESOURCE_SETTINGS:
    case AZURE_TYPEKEYS.SAVE_APP_SERVICE_SETTINGS:
    case MODAL_TYPEKEYS.CLOSE_MODALS:
      return initialState;
    default:
      return state;
  }
};

export { openModal };