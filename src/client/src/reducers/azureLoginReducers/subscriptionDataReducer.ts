import { AZURE_TYPEKEYS } from "../../actions/azureActions/typeKeys";
import AzureActionType from "../../actions/azureActions/azureActionType";
import { MODAL_TYPEKEYS } from "../../actions/modalActions/typeKeys";
import { ICloseModal } from "../../actions/modalActions/modalActions";

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
  action: AzureActionType | ICloseModal
) => {
  switch (action.type) {
    case AZURE_TYPEKEYS.SAVE_AZURE_FUNCTIONS_SETTINGS:
    case AZURE_TYPEKEYS.SAVE_COSMOS_DB_RESOURCE_SETTINGS:
    case AZURE_TYPEKEYS.SAVE_APP_SERVICE_SETTINGS:
    case MODAL_TYPEKEYS.CLOSE_MODALS:
      return { ...state, validName: "" };
    case AZURE_TYPEKEYS.GET_SUBSCRIPTION_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default subscriptionData;
