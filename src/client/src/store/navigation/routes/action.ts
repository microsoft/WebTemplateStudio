import { ISetVisitedPageAction, IResetVisitedPageAction, ISetPageAction, ISetDetails, IPageOptionsActionType } from "./model";
import { TEMPLATES_TYPEKEYS } from "../../typeKeys";
import { IOption } from "../../../types/option";
import { NAVIGATION_ROUTES_TYPEKEYS } from "../typeKeys";

const setVisitedWizardPageAction = (route: string): ISetVisitedPageAction => ({
  type: NAVIGATION_ROUTES_TYPEKEYS.SET_VISITED_WIZARD_PAGE,
  payload: route
});

const resetVisitedWizardPageAction = (): IResetVisitedPageAction => ({
  type: NAVIGATION_ROUTES_TYPEKEYS.RESET_VISITED_WIZARD_PAGE,
});

const setPageWizardPageAction = (route: string): ISetPageAction => ({
  type: NAVIGATION_ROUTES_TYPEKEYS.SET_PAGE_WIZARD_PAGE,
  payload: route
});

const setDetailPageAction = (
  detailPageInfo: IOption,
  isIntlFormatted = false,
  originRoute: string
): ISetDetails => ({
  type: NAVIGATION_ROUTES_TYPEKEYS.SET_DETAILS_PAGE_INFO,
  payload: {
    data: detailPageInfo,
    isIntlFormatted,
    originRoute
  }
});

const getPagesOptionsSuccessAction = (
  pagesOptions: IOption[]
): IPageOptionsActionType => ({
  payload: pagesOptions,
  type: TEMPLATES_TYPEKEYS.SET_PAGES_OPTIONS_SUCCESS
});

export {
  getPagesOptionsSuccessAction,
  setVisitedWizardPageAction,
  resetVisitedWizardPageAction,
  setPageWizardPageAction,
  setDetailPageAction
 };