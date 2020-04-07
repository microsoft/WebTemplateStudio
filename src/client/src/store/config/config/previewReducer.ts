import WizardContentActionType from "../configActionType";
import { CONFIG_TYPEKEYS } from "../../typeKeys";

const previewStatus = (
  state = false,
  action: WizardContentActionType
) => {
  switch (action.type) {
    case CONFIG_TYPEKEYS.SET_PREVIEW_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default previewStatus;
