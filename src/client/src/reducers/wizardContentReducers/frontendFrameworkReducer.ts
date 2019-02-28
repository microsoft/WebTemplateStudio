import * as Actions from "../../actions/types";

/* State Shape
{
    frontendOptions: []
}
*/

const frontendFrameworkOptions = (state: any = [], action: any) => {
  switch (action.type) {
    case Actions.GET_FRONTEND_FRAMEWORKS_SUCCESS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default frontendFrameworkOptions;
