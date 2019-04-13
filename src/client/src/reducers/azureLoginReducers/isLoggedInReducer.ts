import { AZURE_TYPEKEYS } from "../../actions/azureActions/typeKeys";

/* State Shape
{
    isLoggedIn: boolean
}
*/

const profileData = (state: boolean = false, action: any) => {
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
