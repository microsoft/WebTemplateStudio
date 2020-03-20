import { ISelected } from "../../../types/selected";
import { ISetPageAction, IsetPagesAction, IResetPagesAction } from "./model";
import { WIZARD_SELECTION_TYPEKEYS } from "../../../actions/wizardSelectionActions/typeKeys";

export const setPagesAction = (pages: ISelected[]): IsetPagesAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.SELECT_PAGES,
  payload: pages
});

export const setPageAction = (page: ISelected): ISetPageAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.SELECT_PAGE,
  payload: page
});

export const resetPagesAction = (): IResetPagesAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.RESET_PAGES
});