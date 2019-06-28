export enum MODAL_TYPES {
  COSMOS_DB_MODAL = "COSMOS_DB_MODAL",
  AZURE_FUNCTIONS_MODAL = "AZURE_FUNCTIONS_MODAL",
  POST_GEN_MODAL = "POST_GEN_MODAL",
  PRIVACY_MODAL = "PRIVACY_MODAL"
}

export enum MODAL_TYPEKEYS {
  OPEN_MODAL = "WTS/modals/OPEN_MODAL",
  CLOSE_MODALS = "WTS/modals/CLOSE_MODALS"
}

export type ModalType =
  | null
  | MODAL_TYPES.COSMOS_DB_MODAL
  | MODAL_TYPES.AZURE_FUNCTIONS_MODAL
  | MODAL_TYPES.POST_GEN_MODAL
  | MODAL_TYPES.PRIVACY_MODAL;

interface IModalPayload {
  modalType: ModalType;
  modalData: any;
}

export type ModalState = null | IModalPayload;
