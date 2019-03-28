import { createSelector } from "reselect";
import { ITemplates } from "../reducers/generationStatus/templates";

const getTemplateGenerationStatusSelector = (state: any) =>
  state.generationStatus.templates;

const getSyncStatus = (templates: ITemplates): string => templates.syncStatus;

const isTemplateGenerated = (templates: ITemplates): boolean =>
  templates.isGenerated;

const getSyncStatusSelector = createSelector(
  getTemplateGenerationStatusSelector,
  getSyncStatus
);

const isTemplateGeneratedSelector = createSelector(
  getTemplateGenerationStatusSelector,
  isTemplateGenerated
);

export { getSyncStatusSelector, isTemplateGeneratedSelector };
