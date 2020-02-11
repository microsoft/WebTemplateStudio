import { WIZARD_INFO_TYPEKEYS } from "./typeKeys";

export interface ISetVisitedPage {
  type: WIZARD_INFO_TYPEKEYS.SET_VISITED_WIZARD_PAGE;
  payload: string;
}

export interface IResetVisitedPage {
  type: WIZARD_INFO_TYPEKEYS.RESET_VISITED_WIZARD_PAGE;
}

export const setVisitedWizardPageAction = (route: string): ISetVisitedPage => ({
  type: WIZARD_INFO_TYPEKEYS.SET_VISITED_WIZARD_PAGE,
  payload: route
});

export const resetVisitedWizardPageAction = (): IResetVisitedPage => ({
  type: WIZARD_INFO_TYPEKEYS.RESET_VISITED_WIZARD_PAGE,
});
