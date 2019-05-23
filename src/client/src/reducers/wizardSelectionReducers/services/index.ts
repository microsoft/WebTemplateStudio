import { combineReducers } from "redux";
import azureFunctions from "./azureFunctionsReducer";
import cosmosDB from "./cosmosDbReducer";

const serviceReducer = combineReducers({
  azureFunctions,
  cosmosDB
});

export type ServiceState = ReturnType<typeof serviceReducer>;
export default serviceReducer;
