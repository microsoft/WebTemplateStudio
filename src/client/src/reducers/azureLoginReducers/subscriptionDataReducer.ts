import { AZURE_TYPEKEYS } from "../../actions/azureActions/typeKeys";

/* State Shape
{
    SubscriptionData: {
        locations: [],
        resourceGroups: []
    }
}
*/

interface ISubscriptionData {
  locations: any[];
  resourceGroups: any[];
}

const initialState = {
  locations: [],
  resourceGroups: []
};

const subscriptionData = (
  state: ISubscriptionData = initialState,
  action: any
) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.GET_SUBSCRIPTION_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default subscriptionData;
