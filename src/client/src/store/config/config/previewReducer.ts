import WizardContentActionType from "../configActionType";
import { TEMPLATES_TYPEKEYS } from "../../typeKeys";

const previewStatus = (
  state = false,
  action: WizardContentActionType
) => {
  switch (action.type) {
    case TEMPLATES_TYPEKEYS.SET_PREVIEW_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default previewStatus;
