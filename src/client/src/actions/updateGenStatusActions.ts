import * as Actions from "./types";

const updateTemplateGenerationStatusAction = (status: string) => ({
  type: Actions.UPDATE_TEMPLATE_GENERATION_STATUS,
  payload: status
});

export { updateTemplateGenerationStatusAction };
