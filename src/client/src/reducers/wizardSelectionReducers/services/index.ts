import azureFunctions from "./azureFunctionsReducer";
import cosmosDB from "./cosmosDbReducer";
import { combineReducers } from "redux";

export default combineReducers({
  azureFunctions,
  cosmosDB
})