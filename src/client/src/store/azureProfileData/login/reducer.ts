import { AZURE_TYPEKEYS } from "../typeKeys";
import AzureActionType from "../azureActionType";

const initialState: AzureProfile = {
  email: "",
  subscriptions: []
};

export const profileData = (
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

export const isLoggedIn = (state = false, action: AzureActionType) => {
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
