import { createSelector } from "reselect";
import * as Actions from "../actions/types";

const getOpenModal = (state: any): Actions.ModalType => state.modals.openModal;
const isCosmosDbModalOpen = (modal: Actions.ModalType): boolean =>
  modal === Actions.COSMOS_DB_MODAL;
const isAzureFunctionsModalOpen = (modal: Actions.ModalType): boolean => {
  modal === Actions.AZURE_FUNCTIONS_MODAL;
  return false;
};
const isPostGenModalOpen = (modal: Actions.ModalType): boolean =>
  modal === Actions.POST_GEN_MODAL;

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
