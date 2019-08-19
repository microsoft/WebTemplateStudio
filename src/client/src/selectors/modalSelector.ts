import { createSelector } from "reselect";
import { AppState } from "../reducers";
import { ModalType, MODAL_TYPES } from "../actions/modalActions/typeKeys";

const getOpenModal = (state: AppState): ModalType =>
  state.modals.openModal.modalType;
const isAzureLoginModalOpen = (modal: ModalType): boolean =>
  modal === MODAL_TYPES.AZURE_LOGIN_MODAL;
const isCosmosDbModalOpen = (modal: ModalType): boolean =>
  modal === MODAL_TYPES.COSMOS_DB_MODAL;
const isAzureFunctionsModalOpen = (modal: ModalType): boolean =>
  modal === MODAL_TYPES.AZURE_FUNCTIONS_MODAL;
const isPostGenModalOpen = (modal: ModalType): boolean =>
  modal === MODAL_TYPES.POST_GEN_MODAL;
const isRedirectModalOpen = (modal: ModalType): boolean =>
  modal === MODAL_TYPES.PRIVACY_MODAL;
const isViewLicensesModalOpen = (modal: ModalType): boolean =>
  modal === MODAL_TYPES.VIEW_LICENSES_MODAL;
const isAppServiceModalOpen = (modal: ModalType): boolean =>
  modal === MODAL_TYPES.APP_SERVICE_MODAL;
const isAddPagesModalOpen = (modal: ModalType): boolean =>
  modal === MODAL_TYPES.ADD_PAGES_MODAL;

const isAzureLoginModalOpenSelector = createSelector(
  getOpenModal,
  isAzureLoginModalOpen
);

const isCosmosDbModalOpenSelector = createSelector(
  getOpenModal,
  isCosmosDbModalOpen
);

const isAzureFunctionsModalOpenSelector = createSelector(
  getOpenModal,
  isAzureFunctionsModalOpen
);

const isPostGenModalOpenSelector = createSelector(
  getOpenModal,
  isPostGenModalOpen
);

const isRedirectModalOpenSelector = createSelector(
  getOpenModal,
  isRedirectModalOpen
);

const isViewLicensesModalOpenSelector = createSelector(
  getOpenModal,
  isViewLicensesModalOpen
);

const isAppServiceModalOpenSelector = createSelector(
  getOpenModal,
  isAppServiceModalOpen
);

const isAddPagesModalOpenSelector = createSelector(
  getOpenModal,
  isAddPagesModalOpen
);

export {
  isAzureLoginModalOpenSelector,
  isAzureFunctionsModalOpenSelector,
  isCosmosDbModalOpenSelector,
  isPostGenModalOpenSelector,
  isRedirectModalOpenSelector,
  isViewLicensesModalOpenSelector,
  isAppServiceModalOpenSelector,
  isAddPagesModalOpenSelector
};
