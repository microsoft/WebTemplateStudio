import AzureActionType from "./azureActionType";
import { AZURE_TYPEKEYS } from "./typeKeys";

const initialState: AzureProfile = {
  email: "",
  subscriptions: [],
};

export const azureProfileData = (state = initialState, action: AzureActionType): AzureProfile => {
  switch (action.type) {
    case AZURE_TYPEKEYS.LOG_OUT_OF_AZURE:
      return initialState;
    case AZURE_TYPEKEYS.LOG_IN_TO_AZURE:
      const newState = {
        email: action.payload.email,
        subscriptions: action.payload.subscriptions,
      };
      return newState;
    default:
      return state;
  }
};
