import { WIZARD_INFO_TYPEKEYS } from "../../../actions/wizardInfoActions/typeKeys";
import { IOption } from "../../../types/option";

export interface ISetVisitedPage {
  type: WIZARD_INFO_TYPEKEYS.SET_VISITED_WIZARD_PAGE;
  payload: string;
}

export interface IResetVisitedPage {
  type: WIZARD_INFO_TYPEKEYS.RESET_VISITED_WIZARD_PAGE;
}

export interface ISetPage {
  type: WIZARD_INFO_TYPEKEYS.SET_PAGE_WIZARD_PAGE;
  payload: string;
}

export interface IDetail {
  data: IOption;
  isIntlFormatted: boolean;
}

export interface ISetDetails {
  type: WIZARD_INFO_TYPEKEYS.SET_DETAILS_PAGE_INFO;
  payload: IDetail;
}
