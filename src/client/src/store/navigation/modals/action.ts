import { MODAL_TYPEKEYS, MODAL_TYPES, ModalState } from "./typeKeys";
import { Dispatch } from "react";
import ModalActionType from "./modalActionType";
import { IOpenModalAction, ICloseModalAction } from "./model";

const openModalAction = (modal: ModalState): IOpenModalAction => ({
  type: MODAL_TYPEKEYS.OPEN_MODAL,
  payload: modal
});

const closeModalAction = (): ICloseModalAction => ({
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

const openGenModalAction = () => {
  return (dispatch: Dispatch<ModalActionType>) => {
    dispatch(
      openModalAction({
        modalType: MODAL_TYPES.GEN_MODAL,
        modalData: null
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
  openCosmosDbModalAction,
  openGenModalAction,
  openViewLicensesModalAction,
  openAppServiceModalAction,
  openAddPagesModalAction
};
