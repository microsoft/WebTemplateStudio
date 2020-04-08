import _ from "lodash";
import { createSelector } from "reselect";
import { ISelected } from "../../../types/selected";
import { ITemplateInfo } from "../../../types/templateInfo";
import { getOutputPath, getProjectName } from "./wizardSelectionSelector/wizardSelectionSelector";
import {
  SERVICE_KEYS,
  WIZARD_CONTENT_INTERNAL_NAMES,
  COSMOS_APIS
} from "../../../utils/constants";
import { AppState } from "../../combineReducers";
import { UserSelectionState } from "../combineReducers";
import { IOption } from "../../../types/option";
import { SelectionState } from "../../selection/combineReducers";

const DATABASE_INTERNAL_NAME_MAPPING = {
  [COSMOS_APIS.MONGO]: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB_MONGO,
  [COSMOS_APIS.SQL]: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB_SQL
};

const getWizardSelectionsUserSelector = (state: AppState): UserSelectionState => state.userSelection;
const getWizardSelectionsSelector = (state: AppState): SelectionState => state.selection;
const getBackendOptionsSelector = (state: AppState): IOption[] => state.templates.backendOptions;

const getProjectType = (selection: UserSelectionState): string => {
  const projectType = selection.appType as ISelected;
  return projectType.internalName;
};

const getFrontendFramework = (selection: UserSelectionState): string => {
  const { frontendFramework } = selection;
  return frontendFramework.internalName;
};

const getBackendFramework = (selection: UserSelectionState): string => {
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
  return servicesInfo;
};

const getPages = (selection: UserSelectionState): ITemplateInfo[] => {
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
  getWizardSelectionsUserSelector,
  getProjectType
);

const getFrontendFrameworkSelector = createSelector(
  getWizardSelectionsUserSelector,
  getFrontendFramework
);

const getBackendFrameworkSelector = createSelector(
  getWizardSelectionsUserSelector,
  getBackendFramework
);

const getPagesSelector = createSelector(
  getWizardSelectionsUserSelector,
  getPages
);

const getServicesSelector = createSelector(
  getWizardSelectionsSelector,
  getServices
);

const getLinuxVersionFromBackendFrameworkSelector = (
  backendFrameworks: IOption[],
  backendFramework: string
): string => {
  const selectedBackendFramework = backendFrameworks.find(b => b.internalName === backendFramework);
  return selectedBackendFramework && selectedBackendFramework.linuxVersion 
  ? selectedBackendFramework.linuxVersion 
  : "";
};

const getLinuxVersionSelector = createSelector(
  getBackendOptionsSelector,
  getBackendFrameworkSelector,
  getLinuxVersionFromBackendFrameworkSelector
)

const getRuntimeStackSelector = createSelector(
  getLinuxVersionSelector,
  (version) => version === "" ? "" : version.split("|")[0]
)

const rootSelector = createSelector(
  getProjectName,
  getOutputPath,
  getProjectTypeSelector,
  getFrontendFrameworkSelector,
  getBackendFrameworkSelector,
  getLinuxVersionSelector,
  getPagesSelector,
  getServicesSelector,
  (
    projectName,
    path,
    projectType,
    frontendFramework,
    backendFramework,
    backendFrameworkLinuxVersion,
    pages,
    services
  ) => {
    return {
      projectName,
      path,
      projectType,
      frontendFramework,
      backendFramework,
      backendFrameworkLinuxVersion,
      pages,
      services
    };
  }
);

export { rootSelector, getRuntimeStackSelector };
