import { WIZARD_INFO_TYPEKEYS } from "../wizardContent/typeKeys";
import WizardInfoType from "../wizardContent/wizardInfoActionType";

/* State Shape
{
    statusMessage: string;
}
*/

const initialState = "...";

const statusMessage = (
  state: string = initialState,
  action: WizardInfoType
) => {
  switch (action.type) {
    case WIZARD_INFO_TYPEKEYS.UPDATE_TEMPLATE_GENERATION_STATUS_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};

export { statusMessage };
