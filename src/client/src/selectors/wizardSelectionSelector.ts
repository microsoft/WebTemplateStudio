import _ from "lodash";
import { createSelector } from "reselect";
import { RowType } from "../types/rowType";
import { ISelected } from "../types/selected";
import getSvgUrl from "../utils/getSvgUrl";
import { IPageCount } from "../reducers/wizardSelectionReducers/pageCountReducer";
import { defineMessages } from "react-intl";
import { IValidation } from "../reducers/wizardSelectionReducers/updateOutputPath";
import { AppState } from "../reducers";
import { SelectionState } from "../reducers/wizardSelectionReducers";

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

const getWizardSelectionsSelector = (state: AppState): SelectionState =>
  state.selection;
const getProjectName = (state: AppState): string =>
  state.selection.projectNameObject.projectName;
const getProjectNameValidation = (state: AppState): IValidation =>
  state.selection.projectNameObject.validation;
const getOutputPath = (state: AppState): string =>
  state.selection.outputPathObject.outputPath;
const getOutputPathValidation = (state: AppState): IValidation =>
  state.selection.outputPathObject.validation;
const getPageCount = (state: AppState): IPageCount => state.selection.pageCount;

const isValidNameAndProjectPath = (
  projectNameValidationObject: IValidation,
  outputPathValidationObject: IValidation,
  outputPath: string,
  projectName: string
): boolean => {
  if (!projectNameValidationObject || !outputPathValidationObject) {
    return false;
  }
  if (outputPath === "" || projectName === "") {
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
  getOutputPath,
  getProjectName,
  isValidNameAndProjectPath
);

const getProjectTypeRowItems = (selection: SelectionState): RowType[] => {
  const projectType = selection.appType as ISelected;
  return [
    {
      title: projectType.title,
      internalName: projectType.internalName,
      version: selection.appType.version!,
      author: projectType.author
    }
  ];
};

const frameworksRowItems = (selection: SelectionState): RowType[] => {
  const { frontendFramework, backendFramework } = selection;
  return [
    {
      title: frontendFramework.title,
      internalName: frontendFramework.internalName,
      version: frontendFramework.version!,
      author: frontendFramework.author
    },
    {
      title: backendFramework.title,
      internalName: backendFramework.internalName,
      version: backendFramework.version!,
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

const getServices = (selection: SelectionState): RowType[] => {
  const { services } = selection;
  const { azureFunctions, cosmosDB } = services;
  const servicesRows = [];
  if (!_.isEmpty(azureFunctions.selection)) {
    servicesRows.push({
      title: azureFunctions.selection[0].appName.value,
      originalTitle: "Azure Functions",
      company: "Microsoft",
      svgUrl: getSvgUrl(azureFunctions.selection[0].internalName.value),
      functionNames: azureFunctions.selection[0].functionNames,
      internalName: azureFunctions.selection[0].internalName.value,
      version: "1.0"
    });
  }
  if (!_.isEmpty(cosmosDB.selection)) {
    servicesRows.push({
      title: cosmosDB.selection[0].accountName,
      originalTitle: "CosmosDB",
      company: "Microsoft",
      svgUrl: getSvgUrl(cosmosDB.selection[0].internalName),
      internalName: cosmosDB.selection[0].internalName,
      version: "1.0"
    });
  }
  return servicesRows;
};

const getProjectTypeRowItemSelector = createSelector(
  getWizardSelectionsSelector,
  getProjectTypeRowItems
);

const getFrameworksRowItemSelector = createSelector(
  getWizardSelectionsSelector,
  frameworksRowItems
);

const getServicesSelector = createSelector(
  getWizardSelectionsSelector,
  getServices
);

export {
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
