import { combineReducers } from "redux";
import isVisited from "./navigationReducer";
import selected from "./selectedReducer";

export default combineReducers({
  isVisited, selected
});
