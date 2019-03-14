import * as Actions from "./types";
import { ModalType } from "./types";

const openModalAction = (modal: ModalType) => ({
  type: Actions.OPEN_MODAL,
  payload: modal
});

const closeModalAction = () => ({
  type: Actions.CLOSE_MODALS
});

const openCosmosDbModalAction = () => {
  return (dispatch: any) => {
    dispatch(openModalAction(Actions.COSMOS_DB_MODAL));
  };
};

export { closeModalAction, openCosmosDbModalAction };
