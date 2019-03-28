import * as Actions from "../../actions/types";

/* State Shape
{
    templates: {
        isGenerated: boolean
    }
}
*/

export interface ITemplates {
  isGenerated: boolean;
  status: string;
}

const initialState = {
  isGenerated: false,
  status: "Loading Generation Status..."
};

const templates = (state: ITemplates = initialState, action: any) => {
  switch (action.type) {
    case Actions.UPDATE_TEMPLATE_GENERATION_STATUS_MESSAGE:
      return {
        ...state,
        status: action.payload
      };
    case Actions.UPDATE_TEMPLATE_GENERATION_STATUS:
      return {
        ...state,
        isGenerated: action.payload
      };
    default:
      return state;
  }
};

export { templates };
