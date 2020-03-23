import { ISetVisitedPage, IResetVisitedPage, ISetPage } from "./model";
import { WIZARD_INFO_TYPEKEYS } from "../../../actions/wizardInfoActions/typeKeys";

export const setVisitedWizardPageAction = (route: string): ISetVisitedPage => ({
  type: WIZARD_INFO_TYPEKEYS.SET_VISITED_WIZARD_PAGE,
  payload: route
});

export const resetVisitedWizardPageAction = (): IResetVisitedPage => ({
  type: WIZARD_INFO_TYPEKEYS.RESET_VISITED_WIZARD_PAGE,
});

export const setPageWizardPageAction = (route: string): ISetPage => ({
  type: WIZARD_INFO_TYPEKEYS.SET_PAGE_WIZARD_PAGE,
  payload: route
});