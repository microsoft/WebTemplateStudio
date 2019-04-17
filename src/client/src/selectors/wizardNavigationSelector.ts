import { ROUTES } from "../utils/constants";
import { createSelector } from "reselect";
import { AppState } from "../reducers";
import { IRoutes } from "../reducers/wizardRoutes/navigationReducer";

export interface IVisitedPages {
  showProjectTypes: boolean;
  showFrameworks: boolean;
  showPages: boolean;
  showServices: boolean;
}

const getIsVisitedRoutes = (state: AppState) => state.wizardRoutes.isVisited;
const transformIsVisited = (isVisitedRoutes: IRoutes): IVisitedPages => ({
  showProjectTypes: isVisitedRoutes[ROUTES.SELECT_PROJECT_TYPE],
  showFrameworks: isVisitedRoutes[ROUTES.SELECT_FRAMEWORKS],
  showPages: isVisitedRoutes[ROUTES.SELECT_PAGES],
  showServices: isVisitedRoutes[ROUTES.AZURE_LOGIN]
});
const getIsVisitedRoutesSelector = createSelector(
  getIsVisitedRoutes,
  transformIsVisited
);

export { getIsVisitedRoutesSelector };
