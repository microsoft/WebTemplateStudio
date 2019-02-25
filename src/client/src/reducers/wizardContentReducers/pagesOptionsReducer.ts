import * as Actions from "../../actions/types";

/* State Shape
{
    pageOptions: []
}
*/

const pageOptions = (
  state = [
    {
      Name: "Test Detail",
      Template: "wts.Page.React.MasterDetail"
    }
  ],
  action: any
) => {
  switch (action.type) {
    case Actions.GET_PAGES_OPTIONS_SUCCESS:
      return action.payload;
    case Actions.GET_PAGES_OPTIONS:
    default:
      return state;
  }
};

export default pageOptions;
