import { NAVIGATION_ROUTES_TYPEKEYS } from "../typeKeys";
import RootAction from "../../ActionType";

const isDirty = (
  state = false,
  action: RootAction
) => {
  switch (action.type) {
    case NAVIGATION_ROUTES_TYPEKEYS.SET_IS_DIRTY:
      return action.payload;
    default:
      return state;
  }
};
export default isDirty;