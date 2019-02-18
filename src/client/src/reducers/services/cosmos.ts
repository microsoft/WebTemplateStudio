import * as Actions from "../../actions/types";

/* State Shape
{
    cosmosOptions: {}
}
*/

const cosmosOptions = (state = {}, action: any) => {
  switch (action.type) {
    case Actions.SAVE_COSMOS_DB_RESOURCE_SETTINGS:
      return action.payload;
    default:
      return state;
  }
};

export default cosmosOptions;
