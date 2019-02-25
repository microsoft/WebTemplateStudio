import { combineReducers } from "redux";

import backendFramework from "./selectBackendFrameworkReducer";
import frontendFramework from "./selectFrontendFrameworkReducer";
import pages from "./selectPagesReducer";
import appType from "./selectWebAppReducer";
import services from "./services";

export default combineReducers({
    appType,
    frontendFramework,
    backendFramework,
    pages,
    services,
});
