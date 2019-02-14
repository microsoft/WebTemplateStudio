import * as Actions from "../../actions/types";

/* State Shape
{
    backendOptions: []
}
*/

const backendOptions = (state = [], action: any) => {
    switch(action.type) {
        case Actions.GET_BACKEND_FRAMEWORKS_SUCCESS:
            return action.payload;
        case Actions.GET_BACKEND_FRAMEWORKS:
        default:
            return state;
    }
}

export default backendOptions;
