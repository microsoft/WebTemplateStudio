import { combineReducers } from "redux";
import azureFunctions from "./azureFunctionsReducer";
import cosmosDB from "./cosmosDbReducer";
import appService from "./appServiceReducer";

const serviceReducer = combineReducers({
  azureFunctions,
  cosmosDB,
  appService
});

export type ServiceState = ReturnType<typeof serviceReducer>;
export default serviceReducer;
