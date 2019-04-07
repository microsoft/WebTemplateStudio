import _ from "lodash";
import { createSelector } from "reselect";
import { RowType } from "../types/rowType";
import { ISelected } from "../types/selected";
import getSvgUrl from "../utils/getSvgUrl";
import { SERVICE_KEYS } from "../utils/constants";
import { IPageCount } from "../reducers/wizardSelectionReducers/pageCountReducer";
import { defineMessages } from "react-intl";

export const messages = defineMessages({
  azureFunctionsOriginalTitle: {
    id: "azureFunctions.originalTitle",
    defaultMessage: "Azure Functions"
  },
  cosmosOriginalTitle: {
    id: "cosmosDb.originalTitle",
    defaultMessage: "CosmosDB"
  }
});
import { IValidation } from "../reducers/wizardSelectionReducers/updateOutputPath";

// FIXME: Properly define types
const getWizardSelectionsSelector = (state: any): any => state.selection;
const getProjectName = (state: any): string =>
  state.selection.projectNameObject.projectName;
const getProjectNameValidation = (state: any): any =>
  state.selection.projectNameObject.validation;
const getOutputPath = (state: any): string =>
  state.selection.outputPathObject.outputPath;
const getOutputPathValidation = (state: any): IValidation =>
  state.selection.outputPathObject.validation;
const getPageCount = (state: any): IPageCount => state.selection.pageCount;

const isValidNameAndProjectPath = (
  projectNameValidationObject: IValidation,
  outputPathValidationObject: IValidation
): boolean => {
  if (!projectNameValidationObject || !outputPathValidationObject) {
    return false;
  }
  if (
    !projectNameValidationObject.isValid ||
    !outputPathValidationObject.isValid
  ) {
    return false;
  }
  return true;
};

const isValidNameAndProjectPathSelector = createSelector(
  getProjectNameValidation,
  getOutputPathValidation,
  isValidNameAndProjectPath
);

const getProjectTypeRowItems = (selection: any): RowType[] => {
  const projectType = selection.appType as ISelected;
  return [
    {
      type: "Project Type",
      title: projectType.title,
      svgUrl: getSvgUrl(projectType.internalName),
      version: selection.version,
      author: projectType.author
    }
  ];
};

const frameworksRowItems = (selection: any): RowType[] => {
  const { frontendFramework, backendFramework } = selection;
  return [
    {
      type: "Front-end framework",
      title: frontendFramework.title,
      svgUrl: getSvgUrl(frontendFramework.internalName),
      version: frontendFramework.version,
      author: frontendFramework.author
    },
    {
      type: "Back-end framework",
      title: backendFramework.title,
      svgUrl: getSvgUrl(backendFramework.internalName),
      version: backendFramework.version,
      author: backendFramework.author
    }
  ];
};

/**
 * Iterates through every service, and for every services, identifies each
 * resource that was created and adds it to a list that will be displayed on the
 * summary page. Currently supports Azure Functions and CosmosDB only. Information
 * provided is in line with props required by SummaryTile component.
 *
 * @param selection selection object created by the developer
 */
const getServices = (selection: any): any => {
  const { services } = selection;
  const servicesRows = [];
  for (const serviceKey in services) {
    for (const selection of services[serviceKey].selection) {
      if (serviceKey === SERVICE_KEYS.AZURE_FUNCTIONS) {
        servicesRows.push({
          title: selection.appName,
          originalTitle: "Azure Functions",
          author: "Microsoft",
          serviceTitle: messages.azureFunctionsOriginalTitle,
          svgUrl: getSvgUrl(selection.internalName),
          functionNames: selection.functionNames,
          internalName: selection.internalName,
          version: selection.version
        });
      } else if (serviceKey === SERVICE_KEYS.COSMOS_DB) {
        servicesRows.push({
          title: selection.accountName,
          originalTitle: "CosmosDB",
          author: "Microsoft",
          serviceTitle: messages.cosmosOriginalTitle,
          svgUrl: getSvgUrl(selection.internalName),
          internalName: selection.internalName,
          version: selection.version
        });
      }
    }
  }
  return servicesRows;
};

const getPagesRowItems = (selection: any): RowType[] => {
  const { pages } = selection;
  const pagesRows = [];
  for (const page of pages) {
    pagesRows.push({
      type: page.originalTitle ? page.originalTitle : page.title,
      title: page.title,
      svgUrl: getSvgUrl(page.internalName),
      id: page.id,
      version: selection.version,
      author: page.author,
      originalTitle: page.originalTitle
    });
  }
  return pagesRows;
};

const getProjectTypeRowItemSelector = createSelector(
  getWizardSelectionsSelector,
  getProjectTypeRowItems
);

const getFrameworksRowItemSelector = createSelector(
  getWizardSelectionsSelector,
  frameworksRowItems
);

const getPagesRowItemsSelector = createSelector(
  getWizardSelectionsSelector,
  getPagesRowItems
);

const getServicesSelector = createSelector(
  getWizardSelectionsSelector,
  getServices
);

export {
  getPagesRowItemsSelector,
  getProjectTypeRowItemSelector,
  getWizardSelectionsSelector,
  getFrameworksRowItemSelector,
  getServicesSelector,
  getOutputPath,
  getOutputPathValidation,
  getProjectName,
  getPageCount,
  getProjectNameValidation,
  isValidNameAndProjectPathSelector
};
