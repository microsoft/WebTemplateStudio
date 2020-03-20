import { combineReducers } from "redux";
import cosmosDB from "./cosmosDbReducer";
import appService from "./appServiceReducer";

const serviceReducer = combineReducers({
  cosmosDB,
  appService
});

export type ServiceState = ReturnType<typeof serviceReducer>;
export default serviceReducer;
