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
  syncStatus: string;
}

const initialState = {
  isGenerated: false,
  syncStatus: ""
};

const templates = (state: ITemplates = initialState, action: any) => {
  switch (action.type) {
    case Actions.UPDATE_TEMPLATE_GENERATION_STATUS:
      const { isGenerated, syncStatus } = action.payload;
      return {
        ...state,
        isGenerated,
        syncStatus
      };
    default:
      return state;
  }
};

export { templates };
