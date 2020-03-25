import { combineReducers } from "redux";
import {isVisited, selected} from "./pages/reducer";

export default combineReducers({
  isVisited, selected
});
