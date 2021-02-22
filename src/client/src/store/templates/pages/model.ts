import { IOption } from "../../../types/option";
import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";

export interface IDetail {
  originRoute: string;
  data: IOption;
  isIntlFormatted: boolean;
}

export interface IPageOptionsActionType {
  type: TEMPLATES_TYPEKEYS.SET_PAGES_OPTIONS_SUCCESS;
  payload: IOption[];
}
