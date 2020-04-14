import { IOption } from "../../../types/option";
import { NAVIGATION_ROUTES_TYPEKEYS } from "../typeKeys";

export interface ISetVisitedPageAction {
  type: NAVIGATION_ROUTES_TYPEKEYS.SET_VISITED_WIZARD_PAGE;
  payload: string;
}

export interface IResetVisitedPageAction {
  type: NAVIGATION_ROUTES_TYPEKEYS.RESET_VISITED_WIZARD_PAGE;
}

export interface ISetPageAction {
  type: NAVIGATION_ROUTES_TYPEKEYS.SET_PAGE_WIZARD_PAGE;
  payload: string;
}

export interface IDetail {
  originRoute: string;
  data: IOption;
  isIntlFormatted: boolean;
}

export interface ISetDetails {
  type: NAVIGATION_ROUTES_TYPEKEYS.SET_DETAILS_PAGE_INFO;
  payload: IDetail;
}