import { WIZARD_CONTENT_TYPEKEYS } from "../../actions/wizardContentActions/typeKeys";
import WizardContentActionType from "../../actions/wizardContentActions/wizardContentActionType";
import { API } from "../../services/constants";

/* State Shape
{
    serverPort: number
}
*/

const serverPort = (
  state: number = API.START_PORT,
  action: WizardContentActionType
) => {
  switch (action.type) {
    case WIZARD_CONTENT_TYPEKEYS.SET_PORT:
      return action.payload;
    default:
      return state;
  }
};

export default serverPort;
