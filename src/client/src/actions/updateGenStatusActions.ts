import * as Actions from "./types";

const updateTemplateGenerationStatusMessageAction = (status: string) => ({
  type: Actions.UPDATE_TEMPLATE_GENERATION_STATUS,
  payload: status
});

const updateTemplateGenerationStatusAction = (isGenerated: boolean) => ({
  type: Actions.UPDATE_TEMPLATE_GENERATION_STATUS,
  payload: isGenerated
});

export {
  updateTemplateGenerationStatusMessageAction,
  updateTemplateGenerationStatusAction
};
