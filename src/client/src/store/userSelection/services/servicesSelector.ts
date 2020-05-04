import { createSelector } from "reselect";
import { AppState } from "../../combineReducers";

const getServices = createSelector(
  (state: AppState): AppState => state,
  (s) => s.userSelection.services
);

const getAppService = createSelector(
  getServices,
  (services) => services.appService
)

const getCosmosDB = createSelector(
  getServices,
  (services) => services.cosmosDB
)
const hasServices = createSelector(
  getAppService,
  getCosmosDB,
  (appService, cosmosDB) => (appService !== null || cosmosDB !== null)
)

export { getServices, getAppService, getCosmosDB, hasServices };
