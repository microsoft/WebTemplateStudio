import _ from "lodash";
import { createSelector } from "reselect";
import { ISelected } from "../types/selected";
import { ITemplateInfo } from "../types/templateInfo";
import { SERVICE_KEYS } from "../utils/constants";

// FIXME: Properly define types
const getWizardSelectionsSelector = (state: any): any => state.selection;

const getProjectName = (selection: any): string => {
  const { projectName } = selection.projectNameObject;
  return projectName;
};

const getPath = (selection: any): string => {
  const { outputPath } = selection;
  return outputPath;
};

const getProjectType = (selection: any): string => {
  const projectType = selection.appType as ISelected;
  return projectType.internalName;
};

const getFrontendFramework = (selection: any): string => {
  const { frontendFramework } = selection;
  return frontendFramework.internalName;
};

const getBackendFramework = (selection: any): string => {
  const { backendFramework } = selection;
  return backendFramework.internalName;
};

// only works for Cosmos right now
const getServices = (selection: any): ITemplateInfo[] => {
  const { services } = selection;
  const servicesInfo = [];
  if (
    _.has(services, SERVICE_KEYS.COSMOS_DB) &&
    services.cosmosDB.selection.length > 0
  ) {
    servicesInfo.push({
      name: "Cosmos",
      identity: services.cosmosDB.selection[0].internalName
    });
  }
  return servicesInfo;
};

// FIXME: Needs to be in a format that is in line with the Core engine
const getPages = (selection: any): ITemplateInfo[] => {
  const { pages } = selection;
  const pagesInfo = [];
  for (const page of pages) {
    pagesInfo.push({
      name: page.title,
      identity: page.internalName
    });
  }
  return pagesInfo;
};

const getProjectNameSelector = createSelector(
  getWizardSelectionsSelector,
  getProjectName
);

const getPathSelector = createSelector(
  getWizardSelectionsSelector,
  getPath
);

const getProjectTypeSelector = createSelector(
  getWizardSelectionsSelector,
  getProjectType
);

const getFrontendFrameworkSelector = createSelector(
  getWizardSelectionsSelector,
  getFrontendFramework
);

const getBackendFrameworkSelector = createSelector(
  getWizardSelectionsSelector,
  getBackendFramework
);

const getPagesSelector = createSelector(
  getWizardSelectionsSelector,
  getPages
);

const getServicesSelector = createSelector(
  getWizardSelectionsSelector,
  getServices
);

const rootSelector = createSelector(
  getProjectNameSelector,
  getPathSelector,
  getProjectTypeSelector,
  getFrontendFrameworkSelector,
  getBackendFrameworkSelector,
  getPagesSelector,
  getServicesSelector,
  (
    projectName,
    path,
    projectType,
    frontendFramework,
    backendFramework,
    pages,
    services
  ) => {
    return {
      projectName: projectName,
      path: path,
      projectType: projectType,
      frontendFramework: frontendFramework,
      backendFramework: backendFramework,
      pages: pages,
      services: services
    };
  }
);

export { rootSelector };
