import { IOption } from "../../types/option";
import { WIZARD_INFO_TYPEKEYS } from "./typeKeys";

export interface IDetail {
  data: IOption;
  isIntlFormatted: boolean;
}

export interface ISetDetails {
  type: WIZARD_INFO_TYPEKEYS.SET_DETAILS_PAGE_INFO;
  payload: IDetail;
}

export const setDetailPageAction = (
  detailPageInfo: IOption,
  isIntlFormatted: boolean = false
): ISetDetails => ({
  type: WIZARD_INFO_TYPEKEYS.SET_DETAILS_PAGE_INFO,
  payload: {
    data: detailPageInfo,
    isIntlFormatted
  }
});
