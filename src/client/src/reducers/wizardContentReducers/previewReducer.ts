import { WIZARD_CONTENT_TYPEKEYS } from "../../actions/wizardContentActions/typeKeys";
import WizardContentActionType from "../../actions/wizardContentActions/wizardContentActionType";

/* State Shape
{
    previewStatus: boolean
}
*/

const previewStatus = (
  state: boolean = false,
  action: WizardContentActionType
) => {
  switch (action.type) {
    case WIZARD_CONTENT_TYPEKEYS.SET_PREVIEW_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default previewStatus;
