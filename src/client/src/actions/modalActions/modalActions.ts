import { MODAL_TYPEKEYS, MODAL_TYPES, ModalType, ModalState } from "./typeKeys";
import { Dispatch } from "react";
import ModalActionType from "./modalActionType";

export interface IOpenModal {
  type: MODAL_TYPEKEYS.OPEN_MODAL;
  payload: ModalState;
}

export interface ICloseModal {
  type: MODAL_TYPEKEYS.CLOSE_MODALS;
}

const openModalAction = (modal: ModalState): IOpenModal => ({
  type: MODAL_TYPEKEYS.OPEN_MODAL,
  payload: modal
});

const closeModalAction = (): ICloseModal => ({
  type: MODAL_TYPEKEYS.CLOSE_MODALS
});

const openCosmosDbModalAction = () => {
  return (dispatch: Dispatch<ModalActionType>) => {
    dispatch(
      openModalAction({
        modalType: MODAL_TYPES.COSMOS_DB_MODAL,
        modalData: null
      })
    );
  };
};

const openAzureFunctionsModalAction = () => {
  return (dispatch: Dispatch<ModalActionType>) => {
    dispatch(
      openModalAction({
        modalType: MODAL_TYPES.AZURE_FUNCTIONS_MODAL,
        modalData: null
      })
    );
  };
};

const openPostGenModalAction = () => {
  return (dispatch: Dispatch<ModalActionType>) => {
    dispatch(
      openModalAction({
        modalType: MODAL_TYPES.POST_GEN_MODAL,
        modalData: null
      })
    );
  };
};

const openPrivacyModalAction = (frameworkName: string) => {
  return (dispatch: Dispatch<ModalActionType>) => {
    dispatch(
      openModalAction({
        modalType: MODAL_TYPES.PRIVACY_MODAL,
        modalData: frameworkName
      })
    );
  };
};

export {
  closeModalAction,
  openAzureFunctionsModalAction,
  openCosmosDbModalAction,
  openPostGenModalAction,
  openPrivacyModalAction
};
