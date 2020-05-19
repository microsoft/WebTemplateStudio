import { ISetIsDirtyPageAction } from "./model";
import { NAVIGATION_ROUTES_TYPEKEYS } from "../typeKeys";

const setIsDirtyAction = (route: boolean): ISetIsDirtyPageAction => ({
  type: NAVIGATION_ROUTES_TYPEKEYS.SET_IS_DIRTY,
  payload: route
});

export { setIsDirtyAction };