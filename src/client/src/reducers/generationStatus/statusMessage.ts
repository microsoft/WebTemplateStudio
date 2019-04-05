import * as Actions from "../../actions/types";

/* State Shape
{
    statusMessage: string;
}
*/

const initialState = "...";

const statusMessage = (state: string = initialState, action: any) => {
  switch (action.type) {
    case Actions.UPDATE_TEMPLATE_GENERATION_STATUS_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};

export { statusMessage };
