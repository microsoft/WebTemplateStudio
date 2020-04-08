import _ from "lodash";
import { createSelector } from "reselect";
import { ISelected } from "../../../types/selected";
import { ITemplateInfo } from "../../../types/templateInfo";
import {
  SERVICE_KEYS,
  WIZARD_CONTENT_INTERNAL_NAMES,
  COSMOS_APIS
} from "../../../utils/constants";
import { SelectionState } from "../combineReducers";
import { AppState } from "../../combineReducers";

const DATABASE_INTERNAL_NAME_MAPPING = {
  [COSMOS_APIS.MONGO]: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB_MONGO,
  [COSMOS_APIS.SQL]: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB_SQL
};

const getWizardSelectionsSelector = (state: AppState): SelectionState => state.selection;

const getProjectType = (selection: SelectionState): string => {
  const projectType = selection.appType as ISelected;
  return projectType.internalName;
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

const getProjectTypeSelector = createSelector(
  getWizardSelectionsSelector,
  getProjectType
);

const getServicesSelector = createSelector(
  getWizardSelectionsSelector,
  getServices
);

const rootSelector = createSelector(
  getProjectTypeSelector,
  getServicesSelector,
  (
    projectType,
    services
  ) => {
    return {
      projectType,
      services
    };
  }
);

export { rootSelector };
