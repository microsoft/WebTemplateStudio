import { createSelector } from "reselect";

import { IOption } from "../../../types/option";
import { ITemplateInfo } from "../../../types/templateInfo";
import { AppState } from "../../combineReducers";
import { UserSelectionState } from "../combineReducers";
import { getProjectTypeSelector } from "../projectType/selector";
import { getServices } from "../services/servicesSelector";
import { getOutputPath, getProjectName } from "./wizardSelectionSelector/wizardSelectionSelector";

const getWizardSelectionsUserSelector = (state: AppState): UserSelectionState => state.userSelection;
const getBackendOptionsSelector = (state: AppState): IOption[] => state.templates.backendOptions;
const getFrontendFramework = (selection: UserSelectionState): string => {
  const { frontendFramework } = selection;
  return frontendFramework.internalName;
};

const getBackendFramework = (selection: UserSelectionState): string => {
  const { backendFramework } = selection;
  return backendFramework.internalName;
};

const getPages = (selection: UserSelectionState): ITemplateInfo[] => {
  const { pages } = selection;
  const pagesInfo = [];
  for (const page of pages) {
    pagesInfo.push({
      name: page.title,
      identity: page.internalName,
    });
  }
  return pagesInfo;
};

const getFrontendFrameworkSelector = createSelector(getWizardSelectionsUserSelector, getFrontendFramework);

const getBackendFrameworkSelector = createSelector(getWizardSelectionsUserSelector, getBackendFramework);

const getPagesSelector = createSelector(getWizardSelectionsUserSelector, getPages);

const getLinuxVersionFromBackendFrameworkSelector = (
  backendFrameworks: IOption[],
  backendFramework: string
): string => {
  const selectedBackendFramework = backendFrameworks.find((b) => b.internalName === backendFramework);
  return selectedBackendFramework && selectedBackendFramework.linuxVersion ? selectedBackendFramework.linuxVersion : "";
};

const getLinuxVersionSelector = createSelector(
  getBackendOptionsSelector,
  getBackendFrameworkSelector,
  getLinuxVersionFromBackendFrameworkSelector
);

const getRuntimeStackSelector = createSelector(getLinuxVersionSelector, (version) =>
  version === "" ? "" : version.split("|")[0]
);

const getGenerationData = createSelector(
  getProjectName,
  getOutputPath,
  getProjectTypeSelector,
  getFrontendFrameworkSelector,
  getBackendFrameworkSelector,
  getLinuxVersionSelector,
  getPagesSelector,
  getServices,
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
      services,
    };
  }
);

export { getGenerationData, getRuntimeStackSelector };
