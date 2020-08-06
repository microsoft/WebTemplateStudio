import { ISetDetails } from "./model";
import { IOption } from "../../../types/option";
import { NAVIGATION_ROUTES_TYPEKEYS } from "../../navigation/typeKeys";

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

export {
  setDetailPageAction
 };