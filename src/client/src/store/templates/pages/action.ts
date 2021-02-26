import { IOption } from "../../../types/option";
import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";
import { IPageOptionsActionType } from "./model";

const setPagesOptionsSuccessAction = (pagesOptions: IOption[]): IPageOptionsActionType => ({
  payload: pagesOptions,
  type: TEMPLATES_TYPEKEYS.SET_PAGES_OPTIONS_SUCCESS,
});

export { setPagesOptionsSuccessAction };
