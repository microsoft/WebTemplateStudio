import { combineReducers } from "redux";

import { statusMessage } from "./statusMessage";
import { genStatus } from "./genStatus";

export default combineReducers({
  statusMessage,
  genStatus
});
