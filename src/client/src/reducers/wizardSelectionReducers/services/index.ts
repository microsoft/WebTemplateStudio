import * as Actions from "../../../actions/types";

/* State Shape
{
    services: {}
}
*/

const services = (state = {}, action: any) => {
  switch (action.type) {
    case Actions.SAVE_COSMOS_DB_RESOURCE_SETTINGS:
      const newState = {
        ...state,
        cosmosOptions: action.payload
      };
      return newState;
    case Actions.LOG_OUT_OF_AZURE:
      return {};
    default:
      return state;
  }
};

export default services;
