import { WIZARD_INFO_TYPEKEYS } from "../wizardContent/typeKeys";
import { IServiceStatus } from "./statusReducer";
import { IUpdateGenStatusMessage, IUpdateGenStatus } from "./model";

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
