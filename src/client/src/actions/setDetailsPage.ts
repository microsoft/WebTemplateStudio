import * as Actions from "./types";
import { IOption } from "../types/option";

export const setDetailPageAction = (
  detailPageInfo: IOption,
  isIntlFormatted: boolean = false
) => ({
  type: Actions.SET_DETAILS_PAGE_INFO,
  payload: {
    data: detailPageInfo,
    isIntlFormatted
  }
});
