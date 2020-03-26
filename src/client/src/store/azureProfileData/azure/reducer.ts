import { AZURE_TYPEKEYS } from "../typeKeys";
import AzureActionType from "../azureActionType";

const initialState: SubscriptionData = {
  locations: [],
  resourceGroups: []
};

export const subscriptionData = (
  state = initialState,
  action: AzureActionType
) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.GET_SUBSCRIPTION_DATA:
      return action.payload;
    default:
      return state;
  }
};