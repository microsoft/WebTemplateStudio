import { combineReducers } from "redux";

import backendFramework from "./selectBackendFrameworkReducer";
import frontendFramework from "./selectFrontendFrameworkReducer";

export default combineReducers({
    frontendFramework,
    backendFramework
});
