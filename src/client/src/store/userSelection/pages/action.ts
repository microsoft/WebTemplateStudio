import { ISelected } from "../../../types/selected";
import { ISetPageAction, IsetPagesAction, IResetPagesAction } from "./model";
import { USERSELECTION_TYPEKEYS } from "../typeKeys";

export const setPagesAction = (pages: ISelected[]): IsetPagesAction => ({
  type: USERSELECTION_TYPEKEYS.SELECT_PAGES,
  payload: pages
});

export const setPageAction = (page: ISelected): ISetPageAction => ({
  type: USERSELECTION_TYPEKEYS.SELECT_PAGE,
  payload: page
});

export const resetPagesAction = (): IResetPagesAction => ({
  type: USERSELECTION_TYPEKEYS.RESET_PAGES
});