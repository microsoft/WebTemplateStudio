import { WIZARD_INFO_TYPEKEYS } from "./typeKeys";

export interface IUpdateGenStatusMessage {
  type: WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS_MESSAGE;
  payload: string;
}

export interface IUpdateGenStatus {
  type: WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS;
  payload: boolean;
}

const updateTemplateGenerationStatusMessageAction = (status: string) => ({
  type: WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS_MESSAGE,
  payload: status
});

const updateTemplateGenerationStatusAction = (
  isGenerated: boolean
): IUpdateGenStatus => ({
  type: WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS,
  payload: isGenerated
});

export {
  updateTemplateGenerationStatusMessageAction,
  updateTemplateGenerationStatusAction
};
