import { createSelector } from "reselect";

const getTemplateGenerationStatusSelector = (state: any) =>
  state.generationStatus.genStatus;

const getSyncStatus = (templates: any): string => "yo";

const isTemplateGenerated = (templates: any): boolean => true;

const getSyncStatusSelector = createSelector(
  getTemplateGenerationStatusSelector,
  getSyncStatus
);

const isTemplateGeneratedSelector = createSelector(
  getTemplateGenerationStatusSelector,
  isTemplateGenerated
);

export { getSyncStatusSelector, isTemplateGeneratedSelector };
