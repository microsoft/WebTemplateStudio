import { ISelected } from "../../../types/selected";
import { ISelectPageAction, ISelectPagesAction, IResetPagesAction } from "./model";
import { WIZARD_SELECTION_TYPEKEYS } from "../../../actions/wizardSelectionActions/typeKeys";

export const selectPagesAction = (pages: ISelected[]): ISelectPagesAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.SELECT_PAGES,
  payload: pages
});

export const selectPageAction = (page: ISelected): ISelectPageAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.SELECT_PAGE,
  payload: page
});

export const resetPagesAction = (): IResetPagesAction => ({
  type: WIZARD_SELECTION_TYPEKEYS.RESET_PAGES
});