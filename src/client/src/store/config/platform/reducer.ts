import { CONFIG_TYPEKEYS } from "../configTypeKeys";
import { PLATFORM } from "../../../utils/constants/constants";
import RootAction from "../../ActionType";
import { IPlatform } from "./model";

const initialState: IPlatform = {
  id: PLATFORM.WEB,
  requirements: [],
};

const platformReducer = (state: IPlatform = initialState, action: RootAction) => {
  switch (action.type) {
    case CONFIG_TYPEKEYS.SET_PLATFORM:
      return action.payload;
    default:
      return state;
  }
};

export default platformReducer;
