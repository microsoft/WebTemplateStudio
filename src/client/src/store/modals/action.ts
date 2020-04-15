import { MODAL_TYPEKEYS, MODAL_TYPES, ModalState } from "./typeKeys";
import { IOpenModalAction, ICloseModalAction } from "./model";

const openModalAction = (modal: ModalState): IOpenModalAction => ({
  type: MODAL_TYPEKEYS.OPEN_MODAL,
  payload: modal
});

const closeModalAction = (): ICloseModalAction => ({
  type: MODAL_TYPEKEYS.CLOSE_MODALS
});

const openAzureLoginModalAction = (serviceInternalName: string) => {
  return openModalAction({
    modalType: MODAL_TYPES.AZURE_LOGIN_MODAL,
    modalData: serviceInternalName
  })
};

const openCosmosDbModalAction = () => {
  return openModalAction({
    modalType: MODAL_TYPES.COSMOS_DB_MODAL,
    modalData: null
  });
};

const openGenModalAction = () => {
  return openModalAction({
    modalType: MODAL_TYPES.GEN_MODAL,
    modalData: null
  });
};

const openViewLicensesModalAction = () => {
  return openModalAction({
    modalType: MODAL_TYPES.VIEW_LICENSES_MODAL,
    modalData: null
  });
};

const openAppServiceModalAction = () => {
  return openModalAction({
    modalType: MODAL_TYPES.APP_SERVICE_MODAL,
    modalData: null
  });
};

const openAddPagesModalAction = () => {
  return openModalAction({
    modalType: MODAL_TYPES.ADD_PAGES_MODAL,
    modalData: null
  });
};

export {
  closeModalAction,
  openAzureLoginModalAction,
  openCosmosDbModalAction,
  openGenModalAction,
  openViewLicensesModalAction,
  openAppServiceModalAction,
  openAddPagesModalAction,
};
