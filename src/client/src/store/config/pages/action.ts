import { ISetVisitedPageAction, IResetVisitedPageAction, ISetPageAction, ISetDetails, IPageOptionsActionType } from "./model";
import { WIZARD_INFO_TYPEKEYS, TEMPLATES_TYPEKEYS } from "../../typeKeys";
import { IOption } from "../../../types/option";

const setVisitedWizardPageAction = (route: string): ISetVisitedPageAction => ({
  type: WIZARD_INFO_TYPEKEYS.SET_VISITED_WIZARD_PAGE,
  payload: route
});

const resetVisitedWizardPageAction = (): IResetVisitedPageAction => ({
  type: WIZARD_INFO_TYPEKEYS.RESET_VISITED_WIZARD_PAGE,
});

const setPageWizardPageAction = (route: string): ISetPageAction => ({
  type: WIZARD_INFO_TYPEKEYS.SET_PAGE_WIZARD_PAGE,
  payload: route
});

const setDetailPageAction = (
  detailPageInfo: IOption,
  isIntlFormatted = false,
  originRoute: string
): ISetDetails => ({
  type: WIZARD_INFO_TYPEKEYS.SET_DETAILS_PAGE_INFO,
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
  type: TEMPLATES_TYPEKEYS.GET_PAGES_OPTIONS_SUCCESS
});

export {
  getPagesOptionsSuccessAction,
  setVisitedWizardPageAction,
  resetVisitedWizardPageAction,
  setPageWizardPageAction,
  setDetailPageAction
 };