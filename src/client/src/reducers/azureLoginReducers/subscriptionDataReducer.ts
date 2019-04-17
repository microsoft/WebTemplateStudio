import * as Actions from "../../actions/types";

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
    case Actions.GET_SUBSCRIPTION_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default subscriptionData;
