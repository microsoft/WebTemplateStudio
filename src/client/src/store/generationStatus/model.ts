import { WIZARD_INFO_TYPEKEYS } from "../wizardContent/typeKeys";
import { IServiceStatus } from "../../reducers/generationStatus/genStatus";

export interface IUpdateGenStatusMessage {
  type: WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS_MESSAGE;
  payload: string;
}

export interface IUpdateGenStatus {
  type: WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS;
  payload: IServiceStatus;
}