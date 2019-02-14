import { combineReducers } from "redux";

import backendFramework from "./selectBackendFrameworkReducer";
import frontendFramework from "./selectFrontendFrameworkReducer";
import pages from "./selectPagesReducer";

export default combineReducers({
    frontendFramework,
    backendFramework,
    pages
});
