import { createSelector } from "reselect";

const getTemplateGenerationStatusSelector = (state: any) =>
  state.generationStatus.genStatus;

const getSyncStatusSelector = (state: any): string =>
  state.generationStatus.statusMessage;

const isTemplateGenerated = (progressObject: any): boolean =>
  progressObject.templates.success;
const isTemplatesFailed = (progressObject: any): boolean =>
  progressObject.templates.failure;

const isTemplateGeneratedSelector = createSelector(
  getTemplateGenerationStatusSelector,
  isTemplateGenerated
);

export { getSyncStatusSelector, isTemplateGeneratedSelector };
