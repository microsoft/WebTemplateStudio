import * as Actions from "../../actions/types";

/* State Shape
{
    pageOptions: []
}
*/

const frontendFrameworks = (state = [], action: any) => {
    switch(action.type) {
        case Actions.GET_FRONTEND_FRAMEWORKS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export default frontendFrameworks;
