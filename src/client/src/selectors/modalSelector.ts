import { createSelector } from "reselect";
import * as Actions from "../actions/types";

const getOpenModal = (state: any): Actions.ModalType => state.modals.openModal;
const isCosmosDbModalOpen = (modal: Actions.ModalType): boolean =>
  modal === Actions.COSMOS_DB_MODAL;

const isCosmosDbModalOpenSelector = createSelector(
  getOpenModal,
  isCosmosDbModalOpen
);

export { isCosmosDbModalOpenSelector };
