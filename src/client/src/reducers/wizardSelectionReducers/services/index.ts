import { combineReducers } from "redux";
import azureFunctions from "./azureFunctionsReducer";
import cosmosDB from "./cosmosDbReducer";

export default combineReducers({
  azureFunctions,
  cosmosDB
});
