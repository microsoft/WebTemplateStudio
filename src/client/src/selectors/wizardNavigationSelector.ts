import { ROUTES } from "../utils/constants";
import { createSelector } from "reselect";

const getIsVisitedRoutes = (state: any) => state.wizardRoutes.isVisited;
const transformIsVisited = (isVisitedRoutes: any): any => {
    return {
        showProjectTypes: isVisitedRoutes[ROUTES.SELECT_PROJECT_TYPE],
        showFrameworks: isVisitedRoutes[ROUTES.SELECT_FRAMEWORKS],
        showPages: isVisitedRoutes[ROUTES.SELECT_PAGES],
        showServices: isVisitedRoutes[ROUTES.AZURE_LOGIN]
    }
}
const getIsVisitedRoutesSelector = createSelector(
    getIsVisitedRoutes,
    transformIsVisited
);

export { getIsVisitedRoutesSelector };