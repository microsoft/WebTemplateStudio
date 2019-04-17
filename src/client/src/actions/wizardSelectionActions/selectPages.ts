import { WIZARD_SELECTION_TYPEKEYS } from "./typeKeys";
import { ISelected } from "../../types/selected";
import { IPageCount } from "../../reducers/wizardSelectionReducers/pageCountReducer";

export interface ISelectPagesAction {
  type: WIZARD_SELECTION_TYPEKEYS.SELECT_PAGES;
  payload: ISelected[];
}

export interface IUpdatePageCountAction {
  type: WIZARD_SELECTION_TYPEKEYS.UPDATE_PAGE_COUNT;
  payload: IPageCount;
}

const selectPagesAction = (pages: ISelected[]): ISelectPagesAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.SELECT_PAGES,
  payload: pages
});

const updatePageCountAction = (
  pageCount: IPageCount
): IUpdatePageCountAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.UPDATE_PAGE_COUNT,
  payload: pageCount
});

export { selectPagesAction, updatePageCountAction };
