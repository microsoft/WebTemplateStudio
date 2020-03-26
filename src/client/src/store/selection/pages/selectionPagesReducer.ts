import { combineReducers } from "redux";
import {isVisited, selected} from "./reducer";

export default combineReducers({
  isVisited, selected
});
