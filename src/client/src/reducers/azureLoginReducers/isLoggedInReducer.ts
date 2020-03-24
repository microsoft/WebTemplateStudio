import { AZURE_TYPEKEYS } from "../../store/azure/typeKeys";
import AzureActionType from "../../store/azure/azureActionType";

/* State Shape
{
    isLoggedIn: boolean
}
*/

const profileData = (state = false, action: AzureActionType) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.LOG_OUT_OF_AZURE:
      return false;
    case AZURE_TYPEKEYS.LOG_IN_TO_AZURE:
      return true;
    case AZURE_TYPEKEYS.IS_LOGGED_IN_TO_AZURE:
    default:
      return state;
  }
};

export default profileData;
