import { CONFIG_TYPEKEYS } from "../../typeKeys";
import RootAction from "../../ActionType";

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
