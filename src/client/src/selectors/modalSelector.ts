import { createSelector } from "reselect";
import { AppState } from "../reducers";
import { ModalType, MODAL_TYPES } from "../actions/modalActions/typeKeys";

const getOpenModal = (state: AppState): ModalType => state.modals.openModal;
const isCosmosDbModalOpen = (modal: ModalType): boolean =>
  modal === MODAL_TYPES.COSMOS_DB_MODAL;
const isAzureFunctionsModalOpen = (modal: ModalType): boolean =>
  modal === MODAL_TYPES.AZURE_FUNCTIONS_MODAL;
const isPostGenModalOpen = (modal: ModalType): boolean =>
  modal === MODAL_TYPES.POST_GEN_MODAL;

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

export {
  isAzureFunctionsModalOpenSelector,
  isCosmosDbModalOpenSelector,
  isPostGenModalOpenSelector
};
