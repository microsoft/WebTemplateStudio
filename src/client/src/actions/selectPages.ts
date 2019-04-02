import * as Actions from "./types";
import { ISelected } from "../types/selected";
import { IPageCount } from "../reducers/wizardSelectionReducers/pageCountReducer";

const selectPagesAction = (pages: ISelected[]) => ({
  type: Actions.SELECT_PAGES,
  payload: pages
});

const updatePageCountAction = (pageCount: IPageCount) => ({
  type: Actions.UPDATE_PAGE_COUNT,
  payload: pageCount
});

export { selectPagesAction, updatePageCountAction };
