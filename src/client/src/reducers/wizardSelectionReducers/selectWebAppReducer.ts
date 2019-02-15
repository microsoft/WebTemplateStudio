import * as Actions from "../../actions/types";

/* State Shape
{
    appType: ""
}
*/

// TODO: Default state to remove once API is hooked up
const webAppReducer = (state = "Full Stack App", action: any) => {
    switch(action.type) {
        case Actions.SELECT_WEB_APP:
            return action.payload;
        default:
            return state;
    }
}

export default webAppReducer;
