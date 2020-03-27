import { WIZARD_INFO_TYPEKEYS } from "../wizardContent/typeKeys";

export interface IUpdateGenStatusMessageAction {
  type: WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS_MESSAGE;
  payload: string;
}

export interface IUpdateGenStatusAction {
  type: WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS;
  payload: IServiceStatus;
}

export interface IStatus {
  success: boolean;
  failure: boolean;
}

export interface IServiceStatus {
  [key: string]: IStatus;
}
