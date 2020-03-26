import { combineReducers } from "redux";
import cosmosDB from "./cosmosDb/cosmosDbReducer";
import appService from "./appService/reducer";

const serviceReducer = combineReducers({
  cosmosDB,
  appService
});

export type ServiceState = ReturnType<typeof serviceReducer>;
export default serviceReducer;
