import { ROUTES } from "../utils/constants";
import { createSelector } from "reselect";

export interface IVisited {
  [key: string]: boolean;
}

const getIsVisitedRoutes = (state: any) => state.wizardRoutes.isVisited;
const transformIsVisited = (isVisitedRoutes: any): IVisited => {
  return {
    showProjectTypes: isVisitedRoutes[ROUTES.SELECT_PROJECT_TYPE],
    showFrameworks: isVisitedRoutes[ROUTES.SELECT_FRAMEWORKS],
    showPages: isVisitedRoutes[ROUTES.SELECT_PAGES],
    showServices: isVisitedRoutes[ROUTES.AZURE_LOGIN]
  };
};
const getIsVisitedRoutesSelector = createSelector(
  getIsVisitedRoutes,
  transformIsVisited
);

export { getIsVisitedRoutesSelector };
