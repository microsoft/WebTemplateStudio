import { AZURE_TYPEKEYS } from "../../actions/azureActions/typeKeys";
import AzureActionType from "../../actions/azureActions/azureActionType";

/* State Shape
{
    profileData: {}
}
*/

interface IAzureProfile {
  email: string | undefined;
  subscriptions: any;
}

const initialState = {
  email: undefined,
  subscriptions: {}
};

const profileData = (
  state: IAzureProfile = initialState,
  action: AzureActionType
) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.LOG_OUT_OF_AZURE:
      return initialState;
    case AZURE_TYPEKEYS.LOG_IN_TO_AZURE:
      const newState = {
        ...state,
        email: action.payload.email,
        subscriptions: action.payload.subscriptions
      };
      return newState;
    default:
      return state;
  }
};

export default profileData;
