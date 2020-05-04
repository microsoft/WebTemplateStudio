import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";
import { IOption } from "../../../types/option";

export interface IDetail {
  originRoute: string;
  data: IOption;
  isIntlFormatted: boolean;
}

export interface IPageOptionsActionType {
  type: TEMPLATES_TYPEKEYS.SET_PAGES_OPTIONS_SUCCESS;
  payload: IOption[];
}