import { USERSELECTION_TYPEKEYS } from "../typeKeys";
import { ISelected } from "../../../types/selected";

export interface IsetPagesAction {
    type: USERSELECTION_TYPEKEYS.SELECT_PAGES;
    payload: ISelected[];
  }
  
  export interface ISetPageAction {
    type: USERSELECTION_TYPEKEYS.SELECT_PAGE;
    payload: ISelected;
  }

  export interface IRoutes {
    [key: string]: boolean;
  }