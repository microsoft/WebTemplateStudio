import { AZURE_TYPEKEYS } from "../../azureProfileData/typeKeys";
import {
  NAVIGATION_MODAL_TYPEKEYS,
  ModalState
} from "../typeKeys";
import RootAction from "../../ActionType";

const initialState: ModalState = {
  modalType: null,
  modalData: null
};

const openModal = (state: ModalState = initialState, action: RootAction) => {
  switch (action.type) {
    case NAVIGATION_MODAL_TYPEKEYS.OPEN_MODAL:
      return action.payload;
    case AZURE_TYPEKEYS.SAVE_COSMOS_DB:
    case AZURE_TYPEKEYS.SAVE_APP_SERVICE:
    case NAVIGATION_MODAL_TYPEKEYS.CLOSE_MODALS:
      return initialState;
    default:
      return state;
  }
};

export { openModal };