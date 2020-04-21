import { combineReducers } from "redux";
import cosmosDB from "../../azureProfileData/cosmosDb/reducer";
import appService from "../../azureProfileData/appService/reducer";

const serviceReducer = combineReducers({
  cosmosDB,
  appService
});

export type ServiceState = ReturnType<typeof serviceReducer>;
export default serviceReducer;
