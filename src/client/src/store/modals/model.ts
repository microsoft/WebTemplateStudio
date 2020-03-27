import { MODAL_TYPEKEYS, ModalState } from "./typeKeys";

export interface IOpenModalAction {
  type: MODAL_TYPEKEYS.OPEN_MODAL;
  payload: ModalState;
}

export interface ICloseModalAction {
  type: MODAL_TYPEKEYS.CLOSE_MODALS;
}

