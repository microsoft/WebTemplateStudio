import * as Actions from "../../actions/types";

/* State Shape
{
    projectTypes: []
}
*/

const projectTypes = (state = [], action: any) => {
  switch (action.type) {
    case Actions.GET_PROJECT_TYPES_SUCCESS:
      console.log(action.payload);
      return { ...state, projectTypes: action.payload };
    default:
      return state;
  }
};

export default projectTypes;
