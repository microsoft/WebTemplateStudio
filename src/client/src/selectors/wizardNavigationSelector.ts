import { ROUTES } from "../utils/constants";
import { createSelector } from "reselect";
import { AppState } from "../reducers";
import { IRoutes } from "../reducers/wizardRoutes/navigationReducer";

export interface IVisitedPages {
  showFrameworks: boolean;
  showPages: boolean;
}

const getIsVisitedRoutes = (state: AppState) => state.wizardRoutes.isVisited;
const transformIsVisited = (isVisitedRoutes: IRoutes): IVisitedPages => ({
  showFrameworks: isVisitedRoutes[ROUTES.SELECT_FRAMEWORKS],
  showPages: isVisitedRoutes[ROUTES.SELECT_PAGES]
});
const getIsVisitedRoutesSelector = createSelector(
  getIsVisitedRoutes,
  transformIsVisited
);

export { getIsVisitedRoutesSelector };
