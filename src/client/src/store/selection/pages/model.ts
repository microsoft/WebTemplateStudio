import { WIZARD_SELECTION_TYPEKEYS } from "../../../actions/wizardSelectionActions/typeKeys";
import { ISelected } from "../../../types/selected";

export interface ISelectPagesAction {
    type: WIZARD_SELECTION_TYPEKEYS.SELECT_PAGES;
    payload: ISelected[];
  }
  
  export interface ISelectPageAction {
    type: WIZARD_SELECTION_TYPEKEYS.SELECT_PAGE;
    payload: ISelected;
  }
  
  export interface IResetPagesAction {
    type: WIZARD_SELECTION_TYPEKEYS.RESET_PAGES;
  }