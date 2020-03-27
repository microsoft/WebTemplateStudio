import { combineReducers } from "redux";

import { statusMessage } from "./statusMessage";
import { genStatus } from "./reducer";

export default combineReducers({
  statusMessage,
  genStatus
});
