import AzureActionType from "../../store/azure/azureActionType";
import { AZURE_TYPEKEYS } from "../../store/azure/typeKeys";


const initialState: SubscriptionData = {
  locations: [],
  resourceGroups: []
};

const subscriptionData = (
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

export default subscriptionData;
