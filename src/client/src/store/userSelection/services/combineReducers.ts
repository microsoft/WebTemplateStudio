import { combineReducers } from "redux";

import appService from "./appService/reducer";
import cosmosDB from "./cosmosDb/reducer";

const serviceReducer = combineReducers({
  cosmosDB,
  appService,
});

export type ServiceState = ReturnType<typeof serviceReducer>;
export default serviceReducer;
