import { CONFIG_TYPEKEYS } from "../configTypeKeys";
import { PLATFORM } from "../../../utils/constants/constants";
import RootAction from "../../ActionType";

const initialState = PLATFORM.WEB;

const platformReducer = (state: string = initialState, action: RootAction) => {
  switch (action.type) {
    case CONFIG_TYPEKEYS.SET_PLATFORM:
      return action.payload;
    default:
      return state;
  }
};

export default platformReducer;
