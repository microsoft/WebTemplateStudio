import { WIZARD_INFO_TYPEKEYS } from "./typeKeys";

export interface ISetPage {
  type: WIZARD_INFO_TYPEKEYS.SET_PAGE_WIZARD_PAGE;
  payload: string;
}

export const setPageWizardPageAction = (route: string): ISetPage => ({
  type: WIZARD_INFO_TYPEKEYS.SET_PAGE_WIZARD_PAGE,
  payload: route
});
