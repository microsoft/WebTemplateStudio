import * as Actions from "../../actions/types";

/* State Shape
{
    appType: ""
}
*/

const webAppReducer = (state = {
  title: "Fullstack Web Application",
  internalName: "Fullstack web app"
}, action: any) => {
  switch (action.type) {
    case Actions.SELECT_WEB_APP:
      return action.payload;
    default:
      return state;
  }
};

export default webAppReducer;
