import * as Actions from "../../actions/types";

/* State Shape
{
    appTypeOptions: []
}
*/

const appTypeOptions = (state = [], action: any) => {
    switch(action.type) {
        case Actions.GET_WEB_APP_OPTIONS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export default appTypeOptions;
