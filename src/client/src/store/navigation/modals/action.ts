import { NAVIGATION_MODAL_TYPEKEYS, NAVIGATION_MODAL_TYPES, ModalState } from "../typeKeys";
import { IOpenModalAction, ICloseModalAction } from "./model";

const openModalAction = (modal: ModalState): IOpenModalAction => ({
  type: NAVIGATION_MODAL_TYPEKEYS.OPEN_MODAL,
  payload: modal,
});

const closeModalAction = (): ICloseModalAction => ({
  type: NAVIGATION_MODAL_TYPEKEYS.CLOSE_MODALS,
});

const openAzureServicesModalAction = (serviceInternalName: string) : IOpenModalAction => {
  return openModalAction({
    modalType: NAVIGATION_MODAL_TYPES.AZURE_LOGIN_MODAL,
    modalData: serviceInternalName,
  });
};

const openCosmosDbModalAction = () : IOpenModalAction => {
  return openModalAction({
    modalType: NAVIGATION_MODAL_TYPES.COSMOS_DB_MODAL,
    modalData: null,
  });
};

const openGenModalAction = () : IOpenModalAction => {
  return openModalAction({
    modalType: NAVIGATION_MODAL_TYPES.GEN_MODAL,
    modalData: null,
  });
};

const openViewLicensesModalAction = () : IOpenModalAction => {
  return openModalAction({
    modalType: NAVIGATION_MODAL_TYPES.VIEW_LICENSES_MODAL,
    modalData: null,
  });
};

const openAppServiceModalAction = () : IOpenModalAction => {
  return openModalAction({
    modalType: NAVIGATION_MODAL_TYPES.APP_SERVICE_MODAL,
    modalData: null,
  });
};

const openPlatformRequirementsAction = () : IOpenModalAction => {
  return openModalAction({
    modalType: NAVIGATION_MODAL_TYPES.VIEW_PLATFORM_REQUIREMENTS_MODAL,
    modalData: null,
  });
};

export {
  closeModalAction,
  openAzureServicesModalAction,
  openCosmosDbModalAction,
  openGenModalAction,
  openViewLicensesModalAction,
  openAppServiceModalAction,
  openPlatformRequirementsAction,
};
