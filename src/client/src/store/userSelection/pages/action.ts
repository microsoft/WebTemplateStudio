import { ISelected } from "../../../types/selected";
import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import { ISetPageAction, IsetPagesAction } from "./model";

export const setPagesAction = (pages: ISelected[]): IsetPagesAction => ({
  type: USERSELECTION_TYPEKEYS.SELECT_PAGES,
  payload: pages,
});

export const setPageAction = (page: ISelected): ISetPageAction => ({
  type: USERSELECTION_TYPEKEYS.SELECT_PAGE,
  payload: page,
});
