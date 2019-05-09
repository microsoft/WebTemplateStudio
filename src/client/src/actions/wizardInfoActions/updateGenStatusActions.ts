import { WIZARD_INFO_TYPEKEYS } from "./typeKeys";
import { IServiceStatus } from "../../reducers/generationStatus/genStatus";

export interface IUpdateGenStatusMessage {
  type: WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS_MESSAGE;
  payload: string;
}

export interface IUpdateGenStatus {
  type: WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS;
  payload: IServiceStatus;
}

const updateTemplateGenerationStatusMessageAction = (status: string): IUpdateGenStatusMessage => ({
  type: WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS_MESSAGE,
  payload: status
});

const updateTemplateGenerationStatusAction = (
  isGenerated: IServiceStatus
): IUpdateGenStatus => ({
  type: WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS,
  payload: isGenerated
});

export {
  updateTemplateGenerationStatusMessageAction,
  updateTemplateGenerationStatusAction
};
