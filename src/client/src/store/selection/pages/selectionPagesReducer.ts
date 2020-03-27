import { combineReducers } from "redux";
import {isVisited, selected} from "./visitedAndSetPageReducer";

export default combineReducers({
  isVisited, selected
});
