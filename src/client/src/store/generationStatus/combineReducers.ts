import { combineReducers } from "redux";

import { statusMessage } from "./statusMessage";
import { genStatus } from "./statusReducer";

export default combineReducers({
  statusMessage,
  genStatus
});
