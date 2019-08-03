import { AZURE_TYPEKEYS } from "../../actions/azureActions/typeKeys";
import AzureActionType from "../../actions/azureActions/azureActionType";

/* State Shape
{
    SubscriptionData: {
        locations: [],
        resourceGroups: [],
        validName: ""
    }
}
*/

export interface ISubscriptionData {
  locations: any[];
  resourceGroups: any[];
  validName: string;
}

const initialState = {
  locations: [],
  resourceGroups: [],
  validName: ""
};

const subscriptionData = (
  state: ISubscriptionData = initialState,
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
