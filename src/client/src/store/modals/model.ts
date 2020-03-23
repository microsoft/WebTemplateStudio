import { MODAL_TYPEKEYS, ModalState } from "./typeKeys";

export interface IOpenModal {
  type: MODAL_TYPEKEYS.OPEN_MODAL;
  payload: ModalState;
}

export interface ICloseModal {
  type: MODAL_TYPEKEYS.CLOSE_MODALS;
}

