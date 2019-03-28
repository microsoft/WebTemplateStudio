import * as Actions from "../../actions/types";

/* State Shape
{
    backendFramework: ""
}
*/

// TODO: Default state to remove once API is hooked up
const backendFramework = (
  state = {
    title: "NodeJS",
    internalName: "NodeJS"
  },
  action: any
) => {
  switch (action.type) {
    case Actions.SELECT_BACKEND_FRAMEWORK:
      return action.payload;
    default:
      return state;
  }
};

export default backendFramework;
