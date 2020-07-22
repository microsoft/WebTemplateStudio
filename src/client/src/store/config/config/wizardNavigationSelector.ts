import { ROUTES } from "../../../utils/constants/routes";
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
  showFrameworks: isVisitedRoutes[ROUTES.SELECT_FRAMEWORKS],
  showPages: isVisitedRoutes[ROUTES.SELECT_PAGES],
  showReviewAndGenerate: isVisitedRoutes[ROUTES.REVIEW_AND_GENERATE]
});

const getIsVisitedRoutesSelector = createSelector(
  getIsVisitedRoutes,
  transformIsVisited
);

export { getIsVisitedRoutesSelector };