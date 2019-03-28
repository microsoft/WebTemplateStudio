import * as Actions from "../../actions/types";

/* State Shape
{
    SubscriptionData: {
        locations: [],
        resourceGroups: []
    }
}
*/

const subscriptionData = (state = {}, action: any) => {
  switch (action.type) {
    case Actions.GET_SUBSCRIPTION_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default subscriptionData;
