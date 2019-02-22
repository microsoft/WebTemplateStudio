import * as Actions from "../../actions/types";

/* State Shape
{
    appType: ""
}
*/

const webAppReducer = (state = [], action: any) => {
  switch (action.type) {
    case Actions.SELECT_WEB_APP:
      return action.payload;
    default:
      return state;
  }
};

export default webAppReducer;
