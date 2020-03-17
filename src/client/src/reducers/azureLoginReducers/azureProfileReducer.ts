import { AZURE_TYPEKEYS } from "../../actions/azureActions/typeKeys";
import AzureActionType from "../../actions/azureActions/azureActionType";

const initialState: AzureProfile = {
  email: "",
  subscriptions: []
};

const profileData = (
  state = initialState,
  action: AzureActionType
) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.LOG_OUT_OF_AZURE:
      return initialState;
    case AZURE_TYPEKEYS.LOG_IN_TO_AZURE:
      const newState = {
        email: action.payload.email,
        subscriptions: action.payload.subscriptions
      };
      return newState;
    default:
      return state;
  }
};

export default profileData;
