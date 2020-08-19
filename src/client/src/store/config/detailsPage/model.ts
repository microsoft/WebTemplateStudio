import { IOption } from "../../../types/option";
import { NAVIGATION_ROUTES_TYPEKEYS } from "../../navigation/typeKeys";

export interface IDetail {
  originRoute: string;
  data: IOption;
  isIntlFormatted: boolean;
}

export interface ISetDetails {
  type: NAVIGATION_ROUTES_TYPEKEYS.SET_DETAILS_PAGE_INFO;
  payload: IDetail;
}