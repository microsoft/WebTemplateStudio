import _ from "lodash";
import { createSelector } from "reselect";
import { RowType } from "../types/rowType";
import { ISelected } from "../types/selected";
import getSvgUrl from "../utils/getSvgUrl";

// FIXME: Properly define types
const getWizardSelectionsSelector = (state: any): any => state.selection;
const getProjectName = (state: any): string => state.selection.projectName;
const getOutputPath = (state: any): string => state.selection.outputPath;

const getProjectTypeRowItems = (selection: any): RowType[] => {
  const projectType = selection.appType as ISelected;
  return [
    {
      type: "Project Type",
      name: projectType.title,
      svgUrl: getSvgUrl(projectType.internalName)
    }
  ];
};

const frameworksRowItems = (selection: any): RowType[] => {
  const { frontendFramework, backendFramework } = selection;
  return [
    {
      type: "Front-end framework",
      name: frontendFramework.title,
      svgUrl: getSvgUrl(frontendFramework.internalName)
    },
    {
      type: "Back-end framework",
      name: backendFramework.title,
      svgUrl: getSvgUrl(backendFramework.internalName)
    }
  ];
};

// only works for Cosmos right now
const getServices = (selection: any): RowType[] => {
  const { services } = selection;
  const servicesRows = [];
  if (_.has(services, "cosmosOptions")) {
    servicesRows.push({
      type: "Cosmos DB",
      name: services.cosmosOptions.api
    });
  }
  return servicesRows;
};

// FIXME: Needs to be in a format that is in line with the Core engine
const getPagesRowItems = (selection: any): RowType[] => {
  const { pages } = selection;
  const pagesRows = [];
  for (const page of pages) {
    pagesRows.push({
      type: page.originalTitle ? page.originalTitle : page.title,
      name: page.title,
      svgUrl: getSvgUrl(page.internalName)
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
  getProjectName
};
