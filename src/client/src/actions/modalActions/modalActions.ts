import { MODAL_TYPEKEYS, MODAL_TYPES, ModalState } from "./typeKeys";
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

const openAzureLoginModalAction = (serviceInternalName: string) => {
  return (dispatch: Dispatch<ModalActionType>) => {
    dispatch(
      openModalAction({
        modalType: MODAL_TYPES.AZURE_LOGIN_MODAL,
        modalData: serviceInternalName
      })
    );
  };
};

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

const openRedirectModalAction = (data: any) => {
  return (dispatch: Dispatch<ModalActionType>) => {
    dispatch(
      openModalAction({
        modalType: MODAL_TYPES.PRIVACY_MODAL,
        modalData: data
      })
    );
  };
};

const openViewLicensesModalAction = () => {
  return (dispatch: Dispatch<ModalActionType>) => {
    dispatch(
      openModalAction({
        modalType: MODAL_TYPES.VIEW_LICENSES_MODAL,
        modalData: null
      })
    );
  };
};

const openAppServiceModalAction = () => {
  return (dispatch: Dispatch<ModalActionType>) => {
    dispatch(
      openModalAction({
        modalType: MODAL_TYPES.APP_SERVICE_MODAL,
        modalData: null
      })
    );
  };
};

const openAddPagesModalAction = () => {
  return (dispatch: Dispatch<ModalActionType>) => {
    dispatch(
      openModalAction({
        modalType: MODAL_TYPES.ADD_PAGES_MODAL,
        modalData: null
      })
    );
  };
};

export {
  closeModalAction,
  openAzureLoginModalAction,
  openAzureFunctionsModalAction,
  openCosmosDbModalAction,
  openPostGenModalAction,
  openRedirectModalAction,
  openViewLicensesModalAction,
  openAppServiceModalAction,
  openAddPagesModalAction
};
