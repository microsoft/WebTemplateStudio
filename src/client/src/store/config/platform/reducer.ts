import SelectionActionType from "./actionTypes";
import { CONFIG_TYPEKEYS } from "../configTypeKeys";
import { PLATFORM } from "../../../utils/constants/constants";

const initialState = PLATFORM.WEB;

const platformReducer = (state: string = initialState, action: SelectionActionType) => {
  switch (action.type) {
    case CONFIG_TYPEKEYS.SELECT_WEB_APP:
      return action.payload;
    default:
      return state;
  }
};

export default platformReducer;
