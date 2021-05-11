import { createSelector } from "reselect";

import { AppState } from "../../combineReducers";

const getServices = createSelector(
  (state: AppState): AppState => state,
  (s) => s.userSelection.services
);

const getAppService = createSelector(getServices, (services) => services.appService);

const getCosmosDB = createSelector(getServices, (services) => services.cosmosDB);
const hasServices = createSelector(
  getAppService,
  getCosmosDB,
  (appService, cosmosDB) => appService !== null || cosmosDB !== null
);

const getServiceFilter = (state: AppState, internalName: string) => {
  const services = getServices(state);
  if (services.appService && services.appService.internalName === internalName) {
    return services.appService;
  }
  if (services.cosmosDB && services.cosmosDB.groupName === internalName) {
    return services.cosmosDB;
  }

  return undefined;
};

const hasSelectedService = createSelector(getServiceFilter, (service) => service !== undefined);

export { getAppService, getCosmosDB, getServices, hasSelectedService, hasServices };
