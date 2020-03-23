import { WIZARD_INFO_TYPEKEYS } from "../../../actions/wizardInfoActions/typeKeys";

export interface ISetVisitedPage {
  type: WIZARD_INFO_TYPEKEYS.SET_VISITED_WIZARD_PAGE;
  payload: string;
}

export interface IResetVisitedPage {
  type: WIZARD_INFO_TYPEKEYS.RESET_VISITED_WIZARD_PAGE;
}
