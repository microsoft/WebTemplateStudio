import { IPageOptionsActionType } from "./model";
import { TEMPLATES_TYPEKEYS } from "../templateTypeKeys";
import { IOption } from "../../../types/option";

const setPagesOptionsSuccessAction = (pagesOptions: IOption[]): IPageOptionsActionType => ({
  payload: pagesOptions,
  type: TEMPLATES_TYPEKEYS.SET_PAGES_OPTIONS_SUCCESS,
});

export { setPagesOptionsSuccessAction };
