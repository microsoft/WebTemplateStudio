import * as Actions from "../../actions/types";

/* State Shape
{
    frontendOptions: []
}
*/

const backendFrameworkOptions = (state = [], action: any) => {
  switch (action.type) {
    case Actions.GET_BACKEND_FRAMEWORKS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default backendFrameworkOptions;
