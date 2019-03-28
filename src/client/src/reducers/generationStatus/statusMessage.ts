import * as Actions from "../../actions/types";

/* State Shape
{
    statusMessage: string;
}
*/

export interface IStatusMessage {
  statusMessage: string;
}

const initialState = {
  statusMessage: "Loading Generation Status..."
};

const statusMessage = (state: IStatusMessage = initialState, action: any) => {
  switch (action.type) {
    case Actions.UPDATE_TEMPLATE_GENERATION_STATUS_MESSAGE:
      return {
        ...state,
        status: action.payload
      };
    case Actions.UPDATE_TEMPLATE_GENERATION_STATUS:
      return {
        ...state,
        genStatus: {
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export { statusMessage };
