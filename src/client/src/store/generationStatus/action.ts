import { WIZARD_INFO_TYPEKEYS } from "../wizardContent/typeKeys";
import { IServiceStatus } from "./model";
import { IUpdateGenStatusMessageAction, IUpdateGenStatusAction } from "./model";

const updateTemplateGenerationStatusMessageAction = (status: string): IUpdateGenStatusMessageAction => ({
  type: WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS_MESSAGE,
  payload: status
});

const updateTemplateGenerationStatusAction = (
  isGenerated: IServiceStatus
): IUpdateGenStatusAction => ({
  type: WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS,
  payload: isGenerated
});

export {
  updateTemplateGenerationStatusMessageAction,
  updateTemplateGenerationStatusAction
};
