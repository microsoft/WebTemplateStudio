import { combineReducers } from "redux";
import azureFunctions from "./azureFunctionsReducer";
import cosmosDB, { ICosmosDB } from "./cosmosDbReducer";
import appService, { IAppService } from "./appServiceReducer";

const serviceReducer = combineReducers({
  azureFunctions,
  cosmosDB,
  appService
});

export interface IServices {
  cosmosDB : ICosmosDB;
  appService : IAppService;
}

export type ServiceState = ReturnType<typeof serviceReducer>;
export default serviceReducer;
