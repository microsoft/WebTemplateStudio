import * as Actions from "../../actions/types";
import { ISelected } from "../../types/selected";

/* State Shape
{
    appType: ""
}
*/

const webAppReducer = (
  state: ISelected = {
    title: "Fullstack Web Application",
    internalName: "FullStackWebApp"
  },
  action: any
) => {
  switch (action.type) {
    case Actions.SELECT_WEB_APP:
      return action.payload;
    default:
      return state;
  }
};

export default webAppReducer;
