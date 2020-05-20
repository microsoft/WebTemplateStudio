import { NAVIGATION_ROUTES_TYPEKEYS } from "../typeKeys";

export interface ISetIsDirtyPageAction {
  type: NAVIGATION_ROUTES_TYPEKEYS.SET_IS_DIRTY;
  payload: boolean;
}
