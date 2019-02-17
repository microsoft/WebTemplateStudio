import { createSelector } from "reselect";
import * as Actions from "../actions/types";
import { ModalType } from "../actions/types";

const getOpenModal = (state: any) => state.modals.openModal;

const isCosmosDbModalOpen = (modal: ModalType) => modal === Actions.COSMOS_DB_MODAL;

const isCosmosDbModalOpenSelector = createSelector(
    getOpenModal,
    isCosmosDbModalOpen,
);

export {
    isCosmosDbModalOpenSelector,
}
