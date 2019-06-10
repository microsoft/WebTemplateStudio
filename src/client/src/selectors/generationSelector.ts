import _ from "lodash";
import { createSelector } from "reselect";
import { ISelected } from "../types/selected";
import { ITemplateInfo } from "../types/templateInfo";
import { getOutputPath, getProjectName } from "./wizardSelectionSelector";
import {
  SERVICE_KEYS,
  WIZARD_CONTENT_INTERNAL_NAMES,
  COSMOS_APIS
} from "../utils/constants";
import { AppState } from "../reducers";
import { SelectionState } from "../reducers/wizardSelectionReducers";

const DATABASE_INTERNAL_NAME_MAPPING = {
  [COSMOS_APIS.MONGO]: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB_MONGO,
  [COSMOS_APIS.SQL]: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB_SQL
};

const getWizardSelectionsSelector = (state: AppState): SelectionState =>
  state.selection;

const getProjectType = (selection: SelectionState): string => {
  const projectType = selection.appType as ISelected;
  return projectType.internalName;
};

const getFrontendFramework = (selection: SelectionState): string => {
  const { frontendFramework } = selection;
  return frontendFramework.internalName;
};

const getBackendFramework = (selection: SelectionState): string => {
  const { backendFramework } = selection;
  return backendFramework.internalName;
};

const getServices = (selection: SelectionState): ITemplateInfo[] => {
  const { services } = selection;
  const servicesInfo = [];
  if (
    _.has(services, SERVICE_KEYS.COSMOS_DB) &&
    services.cosmosDB.selection.length > 0
  ) {
    servicesInfo.push({
      name: "Cosmos",
      identity:
        DATABASE_INTERNAL_NAME_MAPPING[services.cosmosDB.selection[0].api]
    });
  }

  if (
    _.has(services, SERVICE_KEYS.AZURE_FUNCTIONS) &&
    services.azureFunctions.selection.length > 0
  ) {
    const { functionNames } = services.azureFunctions.selection[0];
    if (functionNames) {
      for (const funcName of functionNames) {
        servicesInfo.push({
          name: funcName.title,
          identity: services.azureFunctions.selection[0].internalName.value
        });
      }
    }
  }

  return servicesInfo;
};

const getPages = (selection: SelectionState): ITemplateInfo[] => {
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
  getProjectName,
  getOutputPath,
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
      projectName,
      path,
      projectType,
      frontendFramework,
      backendFramework,
      pages,
      services
    };
  }
);

export { rootSelector };
