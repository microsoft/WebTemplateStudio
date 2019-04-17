import { MODAL_TYPEKEYS, MODAL_TYPES, ModalType } from "./typeKeys";
import { Dispatch } from "react";
import ModalActionType from "./modalActionType";

export interface IOpenModal {
  type: MODAL_TYPEKEYS.OPEN_MODAL;
  payload: ModalType;
}

export interface ICloseModal {
  type: MODAL_TYPEKEYS.CLOSE_MODALS;
}

const openModalAction = (modal: ModalType): IOpenModal => ({
  type: MODAL_TYPEKEYS.OPEN_MODAL,
  payload: modal
});

const closeModalAction = (): ICloseModal => ({
  type: MODAL_TYPEKEYS.CLOSE_MODALS
});

const openCosmosDbModalAction = () => {
  return (dispatch: Dispatch<ModalActionType>) => {
    dispatch(openModalAction(MODAL_TYPES.COSMOS_DB_MODAL));
  };
};

const openAzureFunctionsModalAction = () => {
  return (dispatch: Dispatch<ModalActionType>) => {
    dispatch(openModalAction(MODAL_TYPES.AZURE_FUNCTIONS_MODAL));
  };
};

const openPostGenModalAction = () => {
  return (dispatch: Dispatch<ModalActionType>) => {
    dispatch(openModalAction(MODAL_TYPES.POST_GEN_MODAL));
  };
};

export {
  closeModalAction,
  openAzureFunctionsModalAction,
  openCosmosDbModalAction,
  openPostGenModalAction
};
