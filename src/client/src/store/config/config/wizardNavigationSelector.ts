import { ROUTE } from "../../../utils/constants/routes";
import { createSelector } from "reselect";
import { AppState } from "../../combineReducers";
import { IRoutes } from "../../userSelection/pages/model";

export interface IVisitedPages {
  showFrameworks: boolean;
  showPages: boolean;
  showReviewAndGenerate: boolean;
}

const getIsVisitedRoutes = (state: AppState) => state.navigation.routes.isVisited;
const transformIsVisited = (isVisitedRoutes: IRoutes): IVisitedPages => ({
  showFrameworks: isVisitedRoutes[ROUTE.SELECT_FRAMEWORKS],
  showPages: isVisitedRoutes[ROUTE.ADD_PAGES],
  showReviewAndGenerate: isVisitedRoutes[ROUTE.REVIEW_AND_GENERATE]
});

const getIsVisitedRoutesSelector = createSelector(
  getIsVisitedRoutes,
  transformIsVisited
);

export { getIsVisitedRoutesSelector };