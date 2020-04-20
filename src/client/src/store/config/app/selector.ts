import _ from "lodash";
import { createSelector } from "reselect";
import { ISelected } from "../../../types/selected";
import { ITemplateInfo } from "../../../types/templateInfo";
import {
  SERVICE_KEYS,
  WIZARD_CONTENT_INTERNAL_NAMES,
  AZURE
} from "../../../utils/constants";
import { ConfigState } from "../combineReducers";
import { AppState } from "../../combineReducers";
import { ServiceState } from "../../azureProfileData";

const DATABASE_INTERNAL_NAME_MAPPING = {
  [AZURE.COSMOS_APIS.MONGO]: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB_MONGO,
  [AZURE.COSMOS_APIS.SQL]: WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB_SQL
};

const getServices = (state: AppState): ServiceState => state.services;
const getConfigSelector = (state: AppState): ConfigState => state.config;

const getProjectType = (config: ConfigState): string => {
  const projectType = config.appType as ISelected;
  return projectType.internalName;
};

export const getProjectTypeSelector = createSelector(
  getConfigSelector,
  getProjectType
);

export const getServicesSelector = createSelector(
  getServices,
  (services: ServiceState): ITemplateInfo[] => {
    const servicesInfo = [];
    if (
      _.has(services, SERVICE_KEYS.COSMOS_DB) && services.cosmosDB.selection
    ) {
      servicesInfo.push({
        name: "Cosmos",
        identity:
          DATABASE_INTERNAL_NAME_MAPPING[services.cosmosDB.selection.api]
      });
    }
    return servicesInfo;
  }
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
