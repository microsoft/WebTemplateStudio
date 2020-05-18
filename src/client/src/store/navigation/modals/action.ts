import { NAVIGATION_MODAL_TYPEKEYS, NAVIGATION_MODAL_TYPES, ModalState } from "../typeKeys";
import { IOpenModalAction, ICloseModalAction } from "./model";

const openModalAction = (modal: ModalState): IOpenModalAction => ({
  type: NAVIGATION_MODAL_TYPEKEYS.OPEN_MODAL,
  payload: modal
});

const closeModalAction = (): ICloseModalAction => ({
  type: NAVIGATION_MODAL_TYPEKEYS.CLOSE_MODALS
});

const openAzureLoginModalAction = (serviceInternalName: string) => {
  return openModalAction({
    modalType: NAVIGATION_MODAL_TYPES.AZURE_LOGIN_MODAL,
    modalData: serviceInternalName
  })
};

const openCosmosDbModalAction = () => {
  return openModalAction({
    modalType: NAVIGATION_MODAL_TYPES.COSMOS_DB_MODAL,
    modalData: null
  })
};

const openGenModalAction = () => {
  return openModalAction({
    modalType: NAVIGATION_MODAL_TYPES.GEN_MODAL,
    modalData: null
  })
};

const openViewLicensesModalAction = () => {
  return openModalAction({
    modalType: NAVIGATION_MODAL_TYPES.VIEW_LICENSES_MODAL,
    modalData: null
  })
};

const openAppServiceModalAction = () => {
  return openModalAction({
    modalType: NAVIGATION_MODAL_TYPES.APP_SERVICE_MODAL,
    modalData: null
  })
};

export {
  closeModalAction,
  openAzureLoginModalAction,
  openCosmosDbModalAction,
  openGenModalAction,
  openViewLicensesModalAction,
  openAppServiceModalAction
};
