import { WIZARD_INFO_TYPEKEYS } from "./typeKeys";

export interface ISetVisitedPage {
  type: WIZARD_INFO_TYPEKEYS.SET_VISITED_WIZARD_PAGE;
  payload: string;
}

export const setVisitedWizardPageAction = (route: string): ISetVisitedPage => ({
  type: WIZARD_INFO_TYPEKEYS.SET_VISITED_WIZARD_PAGE,
  payload: route
});
