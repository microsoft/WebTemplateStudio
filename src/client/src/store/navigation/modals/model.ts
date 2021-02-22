import { ModalState, NAVIGATION_MODAL_TYPEKEYS } from "../typeKeys";

export interface IOpenModalAction {
  type: NAVIGATION_MODAL_TYPEKEYS.OPEN_MODAL;
  payload: ModalState;
}

export interface ICloseModalAction {
  type: NAVIGATION_MODAL_TYPEKEYS.CLOSE_MODALS;
}
