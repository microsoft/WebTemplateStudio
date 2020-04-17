import RootAction from "../../ActionType";
import { CONFIG_TYPEKEYS } from "../configTypeKeys";

const previewStatus = (
  state = false,
  action: RootAction
) => {
  switch (action.type) {
    case CONFIG_TYPEKEYS.SET_PREVIEW_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default previewStatus;
