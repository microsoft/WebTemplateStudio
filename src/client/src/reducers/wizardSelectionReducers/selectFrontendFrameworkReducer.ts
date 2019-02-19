import * as Actions from "../../actions/types";

/* State Shape
{
    frontendFramework: ""
}
*/

const frontendFramework = (state = "", action: any) => {
    switch(action.type) {
        case Actions.SELECT_FRONTEND_FRAMEWORK:
            return action.payload;
        default:
            return state;
    }
}

export default frontendFramework;
