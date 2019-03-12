import * as Actions from "../../../actions/types";

/* State Shape
{
    services: {
      isCosmosResourceAccountNameAvailable: false,
      message: "Account name unavailable"
    }
}
*/

const initialState = {
  isCosmosResourceAccountNameAvailable: false,
  message: "Account name unavailable"
}

const services = (state: any = initialState, action: any) => {
  switch (action.type) {
    case Actions.SAVE_COSMOS_DB_RESOURCE_SETTINGS:
      const newState = {
        ...state,
        cosmosOptions: action.payload
      };
      return newState;
    case Actions.SET_ACCOUNT_AVAILABILITY:
      const newAvailabilityState = {
        ...state,
        isCosmosResourceAccountNameAvailable: action.payload.isAvailable,
        message: action.payload.message
      };
      return newAvailabilityState;
    case Actions.LOG_OUT_OF_AZURE:
      return initialState;
    default:
      return state;
  }
};

export default services;
