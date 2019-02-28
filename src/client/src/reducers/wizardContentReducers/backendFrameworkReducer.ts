import * as Actions from "../../actions/types";

/* State Shape
{
    backendOptions: []
}
*/

const backendFrameworkOptions = (state: any = [], action: any) => {
  switch (action.type) {
    case Actions.GET_BACKEND_FRAMEWORKS_SUCCESS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default backendFrameworkOptions;
